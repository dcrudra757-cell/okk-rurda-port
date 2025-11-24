const mongoose = require('mongoose');

// Try to require models; if mongoose isn't connected these will still load but queries will fail.
let AboutModel, ServiceModel, FAQModel, ContactModel, ProjectModel;
try {
  AboutModel = require('./models/About.cjs');
  ServiceModel = require('./models/Service.cjs');
  FAQModel = require('./models/FAQ.cjs');
  ContactModel = require('./models/Contact.cjs');
  ProjectModel = require('./models/Project.cjs');
} catch (e) {
  // ignore; we'll use in-memory fallback
}

// In-memory fallback store
const memory = {
  abouts: [
    {
      mode: 'short',
      content: 'I am Rudra — a full-stack developer and videographer who builds fast, user-friendly web apps and creative video experiences.',
      timeline: [{ title: 'Started Freelancing', date: new Date('2018-06-01'), details: 'Began professional work as a full-stack developer.' }],
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Video Editing']
    }
  ],
  services: [
    { title: 'Full-stack Development', slug: 'full-stack', summary: 'Web applications, APIs, and dashboards.' },
    { title: 'Video Production', slug: 'video', summary: 'Short-form video, editing and motion graphics.' }
  ],
  faqs: [
    { question: 'What is your typical turnaround?', answer: 'Turnaround depends on scope — typically 1-6 weeks.' },
    { question: 'How do you price projects?', answer: 'I price by scope and deliverables; small projects start with a fixed quote.' }
  ],
  projects: [],
  contacts: []
};

function isConnected() {
  try {
    return mongoose.connection && mongoose.connection.readyState === 1;
  } catch (e) {
    return false;
  }
}

async function getAbout(mode = 'short') {
  if (isConnected() && AboutModel) {
    return AboutModel.findOne({ mode }).lean();
  }
  return memory.abouts.find(a => a.mode === mode) || memory.abouts[0];
}

async function getTimeline() {
  if (isConnected() && AboutModel) {
    const doc = await AboutModel.findOne({}).lean();
    return doc?.timeline || [];
  }
  return memory.abouts[0].timeline;
}

async function getServices() {
  if (isConnected() && ServiceModel) {
    return ServiceModel.find().sort({ order: 1 }).lean();
  }
  return memory.services;
}

async function getFAQs() {
  if (isConnected() && FAQModel) {
    return FAQModel.find().sort({ order: 1 }).lean();
  }
  return memory.faqs;
}

async function getProjects() {
  if (isConnected() && ProjectModel) {
    return ProjectModel.find().lean();
  }
  return memory.projects;
}

async function saveContact(data) {
  if (isConnected() && ContactModel) {
    const c = new ContactModel(data);
    return c.save();
  }
  const doc = Object.assign({ _id: String(Date.now()), date: new Date() }, data);
  memory.contacts.unshift(doc);
  return doc;
}

async function countContacts() {
  if (isConnected() && ContactModel) {
    return ContactModel.countDocuments();
  }
  return memory.contacts.length;
}

async function findContacts(limit = 50) {
  if (isConnected() && ContactModel) {
    return ContactModel.find().sort({ date: -1 }).limit(limit).lean();
  }
  return memory.contacts.slice(0, limit);
}

// Expose init function to allow seeding memory store from seed.cjs if desired
function initMemoryFromSeed(seed) {
  if (!seed) return;
  if (seed.about) memory.abouts = [seed.about];
  if (Array.isArray(seed.services)) memory.services = seed.services;
  if (Array.isArray(seed.faqs)) memory.faqs = seed.faqs;
  if (Array.isArray(seed.projects)) memory.projects = seed.projects;
}

module.exports = {
  isConnected,
  getAbout,
  getTimeline,
  getServices,
  getFAQs,
  getProjects,
  saveContact,
  countContacts,
  findContacts,
  initMemoryFromSeed,
  _memory: memory
};
