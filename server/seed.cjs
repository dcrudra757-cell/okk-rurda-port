/*
  CommonJS seed script. Run: node server/seed.cjs
*/
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const About = require('./models/About.cjs');
const Service = require('./models/Service.cjs');
const FAQ = require('./models/FAQ.cjs');
const Project = require('./models/Project.cjs');
const dataProvider = require('./dataProvider.cjs');

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/okk_portfolio';
  let connected = false;
  try {
    await mongoose.connect(uri, { dbName: process.env.DB_NAME || 'okk_portfolio' });
    connected = true;
    console.log('Seed: MongoDB connected');
  } catch (err) {
    console.warn('Seed: MongoDB connect failed, falling back to in-memory store');
  }

  // Prepare seed content (used for DB or in-memory fallback)
  const seedAbout = {
    mode: 'short',
    content: 'I am Rudra — a full-stack developer and videographer who builds fast, user-friendly web apps and creative video experiences.',
    timeline: [ { title: 'Started Freelancing', date: new Date('2018-06-01'), details: 'Began professional work as a full-stack developer.' } ],
    skills: ['React','Node.js','TypeScript','MongoDB','Video Editing']
  };

  const seedServices = [
    { title: 'Full-stack Development', slug: 'full-stack', summary: 'Web applications, APIs, and dashboards.' },
    { title: 'Video Production', slug: 'video', summary: 'Short-form video, editing and motion graphics.' }
  ];

  const seedFAQs = [
    { question: 'What is your typical turnaround?', answer: 'Turnaround depends on scope — typically 1-6 weeks.' },
    { question: 'How do you price projects?', answer: 'I price by scope and deliverables; small projects start with a fixed quote.' }
  ];

  const projectSeed = [
    { title: 'Personal Branding Video', category: 'video', image: '/images/Picsart_25-11-22_21-35-22-069.jpg', description: 'Short-form branding video and trailer.', tech: ['Premiere', 'After Effects'], mode: 'video', featured: true },
    { title: 'Portfolio Website', category: 'dev', image: '/images/Picsart_25-01-17_09-58-34-586.jpg', description: 'Portfolio website with React and Vite.', tech: ['React', 'Vite', 'Node.js'], mode: 'dev', featured: true },
    { title: 'Marketing Short', category: 'video', image: '/images/Picsart_24-06-10_08-40-58-116.jpg', description: 'Social media short-form edit.', tech: ['Davinci Resolve'], mode: 'video' },
    { title: 'E-commerce Demo', category: 'dev', image: '/images/IMG_20250315_190935_0040.jpg', description: 'Headless Shopify demo site.', tech: ['React', 'Shopify'], mode: 'dev' },
    { title: 'Event Recap', category: 'video', image: '/images/IMG_20240921_062536.jpg', description: 'Event highlight reel and edit.', tech: ['Premiere'], mode: 'video' }
  ];

  if (connected) {
    // About
    const aboutExists = await About.findOne({ mode: 'short' });
    if (!aboutExists) {
      await About.create(seedAbout);
      console.log('About (short) seeded');
    }

    // Services
    const svcCount = await Service.countDocuments();
    if (svcCount === 0) {
      await Service.insertMany(seedServices);
      console.log('Services seeded');
    }

    // FAQs
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      await FAQ.insertMany(seedFAQs);
      console.log('FAQs seeded');
    }

    // Projects
    const projCount = await Project.countDocuments();
    if (projCount === 0) {
      await Project.insertMany(projectSeed);
      console.log('Projects seeded');
    }

  } else {
    // initialize in-memory fallback for the running server
    dataProvider.initMemoryFromSeed({ about: seedAbout, services: seedServices, faqs: seedFAQs, projects: projectSeed });
    console.log('Seed: in-memory data initialized with sample projects and content');
  }

  console.log('Seeding finished');
  process.exit(0);
}

main().catch(err => {
  console.error('Seed error', err && err.message ? err.message : err);
  process.exit(1);
});
