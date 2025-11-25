// ULTRA-PREMIUM TONE REPLIES FOR HIGH-END CLIENTS
// Use these responses when you detect luxury-brand or enterprise client intents

const premiumToneReplies = {
  greeting: [
    "I'd be delighted to assist you. Let me guide you to the right place so we can begin with clarity and efficiency.",
    "Thank you for reaching out. I'm here to help you achieve your vision professionally.",
    "Welcome! I'm ready to support your project with full attention and expertise."
  ],

  about_premium: [
    "I'm Ansh Saxena—a creative technologist and founder specializing in premium digital experiences. I combine strategic thinking with exceptional execution.",
    "With expertise in full-stack development and cinematic content creation, I deliver solutions that elevate brands.",
    "I work with discerning clients who value precision, creativity, and long-term partnerships."
  ],

  services_premium: [
    "I offer bespoke web development, premium video production, and strategic AI product development tailored to your brand's needs.",
    "My services include custom web applications, cinematic video content, and innovative digital solutions designed for impact.",
    "I specialize in creating cohesive digital experiences across web, video, and emerging technologies."
  ],

  pricing_premium: [
    "To ensure everything is handled professionally, please share your project details through my Contact Me page for a tailored quote.",
    "For premium projects, I provide customized pricing based on scope, timeline, and deliverables. Let's discuss your requirements.",
    "Every project receives individualized attention. Share your vision, and I'll prepare a comprehensive proposal."
  ],

  portfolio_premium: [
    "I'd be pleased to showcase my curated portfolio of premium projects. Explore my work through the Projects page.",
    "Feel free to browse through my premium project collection—each represents exceptional craftsmanship and client satisfaction.",
    "You can review my case studies and portfolio pieces that demonstrate the quality of work I deliver."
  ],

  collaboration_premium: [
    "I'd be delighted to collaborate with you. Let's begin with a quick message through my Contact Me page.",
    "I'm committed to understanding your vision fully. Kindly proceed to my Contact Me page to start our conversation.",
    "Let's discuss how I can bring your project to life. Please reach out through my Contact form for a professional conversation."
  ],

  contact_premium: [
    "I'd be happy to assist. Kindly proceed to my Contact Me page for a seamless start.",
    "Thank you for your interest. You can reach me through my Contact Me page—I respond personally to every inquiry.",
    "I'd love to hear more about your project. Visit my Contact page to get started."
  ],

  call_premium: [
    "Absolutely. I'm happy to discuss your project in detail. Please request a call via my Contact Me page, and I'll be in touch promptly.",
    "I'd be delighted to connect. Share your preferred time through my Contact page, and I'll arrange a comprehensive discussion.",
    "Of course. Please submit your call request through my Contact Me page—I'll follow up with professionalism and promptness."
  ],

  whatsapp_premium: [
    "Certainly. You can reach me through WhatsApp for quick conversations. Find the link on my Contact page.",
    "Yes, WhatsApp is available. For your convenience, the link is on my Contact Me page.",
    "Absolutely. I maintain WhatsApp for quick communication—find the details on my Contact page."
  ],

  confused_premium: [
    "I appreciate you reaching out, but I'd like to ensure I understand your needs clearly. Could you provide more details?",
    "I want to assist you properly. Let me ask—are you looking for web development, video production, or something specific?",
    "I'm here to help. For the best guidance, could you share a bit more about what you're looking to achieve?"
  ],

  rude_premium: [
    "I understand you may be frustrated. Let's approach this professionally and find a solution together.",
    "I'm committed to excellence in all interactions. How can I assist you constructively?",
    "I appreciate directness, but let's keep our conversation respectful and productive."
  ]
};

// USAGE EXAMPLE:
// if (isHighEndClient) {
//   response = premiumToneReplies.greeting[Math.floor(Math.random() * premiumToneReplies.greeting.length)];
// }

module.exports = premiumToneReplies;
