/*
  CommonJS seed script. Run: node server/seed.cjs
*/
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const About = require('./models/About.cjs');
const Service = require('./models/Service.cjs');
const FAQ = require('./models/FAQ.cjs');

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/okk_portfolio';
  await mongoose.connect(uri, { dbName: process.env.DB_NAME || 'okk_portfolio' });

  const aboutExists = await About.findOne({ mode: 'short' });
  if (!aboutExists) {
    await About.create({
      mode: 'short',
      content: 'I am Rudra — a full-stack developer and videographer who builds fast, user-friendly web apps and creative video experiences.',
      timeline: [
        { title: 'Started Freelancing', date: new Date('2018-06-01'), details: 'Began professional work as a full-stack developer.' }
      ],
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Video Editing']
    });
    console.log('About (short) seeded');
  }

  const svcCount = await Service.countDocuments();
  if (svcCount === 0) {
    await Service.insertMany([
      { title: 'Full-stack Development', slug: 'full-stack', summary: 'Web applications, APIs, and dashboards.' },
      { title: 'Video Production', slug: 'video', summary: 'Short-form video, editing and motion graphics.' }
    ]);
    console.log('Services seeded');
  }

  const faqCount = await FAQ.countDocuments();
  if (faqCount === 0) {
    await FAQ.insertMany([
      { question: 'What is your typical turnaround?', answer: 'Turnaround depends on scope — typically 1-6 weeks.' },
      { question: 'How do you price projects?', answer: 'I price by scope and deliverables; small projects start with a fixed quote.' }
    ]);
    console.log('FAQs seeded');
  }

  console.log('Seeding finished');
  process.exit(0);
}

main().catch(err => {
  console.error('Seed error', err && err.message ? err.message : err);
  process.exit(1);
});
