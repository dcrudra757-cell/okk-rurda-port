const SYSTEM_INSTRUCTION = `You are Ansh (Rudra) Saxena's AI Assistant. Speak AS ANSH using "I / me / my" and follow these rules:

1) Persona: Always speak in first-person as Ansh. Keep replies short, friendly, and professional (1-3 sentences).
2) Redirection: Never ask for project details in-chat. For any hire/collab/quote/project request or when user shows interest, ALWAYS suggest the Contact page.
3) Page suggestions: When recommending a page, provide the exact short label the UI will show (one of the predefined buttons). Do NOT include HTML—just mention which button the UI should show in your internal assistant logic.
4) Intent mapping (auto-detect):
  - "I want to hire you" => Contact
  - "Show me your work" => Projects/Portfolio
  - "Your services?" => Services
  - "Your skills?" => About
  - "Talk on WhatsApp?" => WhatsApp
  - "Want website / video editing?" => Contact
  - "Need pricing?" => Contact
  - "Collaboration?" => Contact
  - "Show resume?" => About
5) If the question is unrelated to navigation, answer briefly (1-2 sentences) and still recommend the best page afterwards.
6) Always be helpful and nudge users to use the Contact Me page for project specifics.

Context: Ansh is a Frontend Developer, Video Editor, and young founder. He studies BCA at Invertis University.

Skills: React, TypeScript, Tailwind, Firebase, Node.js, Adobe Premiere Pro, motion graphics, Web Speech API.

Projects: LifeSync (elder companion app), FeelMate (Hinglish emotional AI), Memory Jar (voice diary), Waste Classifier (CNN), YouTube SEO Analyzer, Editopia Studio, VELNYY.

Keep answers concise and follow the redirection and button rules above.`;

const conversationHistory: Array<{ role: string; content: string }> = [];

// Using a simple, reliable free API
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_TOGETHER_API_KEY || "";

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    if (!API_KEY) {
      return "🤖 AI not configured. Contact Rudra directly via the contact form!";
    }

    // Add user message to history
    conversationHistory.push({ role: "user", content: message });

    // Build messages
    const messages = [
      {
        role: "system",
        content: SYSTEM_INSTRUCTION
      },
      ...conversationHistory.slice(-8).map(msg => ({
        role: msg.role === "assistant" ? "assistant" : msg.role,
        content: msg.content
      }))
    ];

    // Try API call
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: messages,
        temperature: 0.7,
        max_tokens: 300,
      })
    });

    if (!response.ok) {
      console.error("API Error:", response.status);
      // Fallback response
      return getFallbackResponse(message);
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content?.trim();
    
    if (aiMessage) {
      conversationHistory.push({ role: "assistant", content: aiMessage });
      if (conversationHistory.length > 20) {
        conversationHistory.splice(0, 2);
      }
      return aiMessage;
    }

    return getFallbackResponse(message);
  } catch (error) {
    console.error("Chat Error:", error);
    return getFallbackResponse(message);
  }
};

// Smart fallback responses based on keywords
const getFallbackResponse = (message: string): string => {
  const msg = message.toLowerCase();
  
  // NAME QUERIES
  if (msg.includes("name") || msg.includes("who are you") || msg.includes("your name")) {
    return "I'm Ansh, also known as Rudra Saxena. I'm a frontend developer, video editor, and young founder building digital products. Nice to meet you!";
  }

  // CONFUSING / RANDOM MESSAGES
  if (msg.trim().length < 3 || (msg.includes("?") && msg.split(' ').length < 2)) {
    return "I’m not sure what you mean, but I’m here to help! Want to see my services or contact me?";
  }

  if (msg.includes("didn't fully") || msg.includes("didnt fully") || msg.includes("didn't make sense") || msg.includes("didnt make sense") || msg.includes("say it again") || msg.includes("repeat")) {
    return "That message didn’t fully make sense — can you say it again?";
  }

  if (msg.includes("i don't get") || msg.includes("i didnt get") || msg.includes("dont get")) {
    return "Hmm, I didn’t get that. Do you want to start a project or ask something about my work?";
  }

  if (msg.includes("explain") || msg.includes("explain that") || msg.includes("explain a bit") || msg.includes("explain a bit more")) {
    return "Could you explain that a bit more? I want to make sure I reply correctly.";
  }

  if (msg.includes("what exactly") || msg.includes("what are you looking") || msg.includes("what do you want")) {
    return "I might have missed your point — what exactly are you looking for?";
  }

  if (msg.includes("got it") || msg.includes("i think")) {
    return "Got it… I think 😄 Want to guide me a little more?";
  }

  if (msg.includes("try saying") || msg.includes("try saying it") || msg.includes("say it differently")) {
    return "I’m here to help! Maybe try saying it in a different way?";
  }

  if (msg.includes("not sure what that means") || msg.includes("not sure what that") || msg.includes("we can figure it out")) {
    return "Not sure what that means, but we can figure it out together. Need website work or video editing?";
  }
  
  // VIDEO EDITING QUERIES
  if (msg.includes("reel") || msg.includes("short") || msg.includes("tiktok") || msg.includes("instagram")) {
    return "Reels and Shorts are perfect for Editopia Studio work! I create engaging short-form content with fast cuts, trending audio, motion graphics. I'm skilled with Adobe Premiere Pro and can turn projects around in 24-48 hours. Great for boosting engagement!";
  }
  
  if (msg.includes("youtube") || msg.includes("long form") || msg.includes("vlog")) {
    return "YouTube content is a strong area for me. I handle pacing, storytelling, sound design, B-roll. I've also built a YouTube SEO Analyzer tool that helps creators optimize titles and tags for better rankings. 3-5 days depending on video length and complexity.";
  }
  
  if (msg.includes("travel") || msg.includes("cinematic") || msg.includes("documentary")) {
    return "Cinematic content is something I love creating. I handle color grading, sound design, and atmospheric storytelling using Premiere Pro. Building an experience through visuals and audio is key. Works great for both personal projects and brand content.";
  }
  
  if (msg.includes("color") || msg.includes("grade") || msg.includes("lut") || msg.includes("tone")) {
    return "Color grading is essential for the right mood. I work with Adobe Premiere Pro and DaVinci Resolve to create cinematic looks, match brand vibes, or create custom color grades. It transforms how viewers feel watching your content.";
  }
  
  if (msg.includes("motion") || msg.includes("graphic") || msg.includes("animation") || msg.includes("text")) {
    return "Motion graphics and animated text add professional polish! I create lower thirds, animated titles, transitions, and effects synced perfectly to audio. Great for making content stand out and keeping viewer attention.";
  }
  
  if (msg.includes("sound") || msg.includes("audio") || msg.includes("music")) {
    return "Sound design is crucial! I handle audio mixing, synced music, and sound effects. Clean audio, proper balance, and great sound design really elevates your video's impact. It's often the difference between good and great content.";
  }
  
  if (msg.includes("edit") || msg.includes("video") || msg.includes("film")) {
    return "Video editing is core to what I do through Editopia Studio. I focus on pacing, storytelling, and engagement. Adobe Premiere Pro is my main tool. From concept to final export, I handle everything. What kind of video are you working on?";
  }
  
  // WEB DEVELOPMENT QUERIES
  if (msg.includes("velnyy") || msg.includes("clothing") || msg.includes("brand") || msg.includes("fashion")) {
    return "VELNYY is my premium luxury clothing brand! It's all about modern, unique identity in fashion. I handle everything—brand strategy, web presence, product curation. Building a brand from scratch is exciting, and we're focused on quality and distinctive design.";
  }
  
  if (msg.includes("lifesync")) {
    return "LifeSync is my elder companion app! It features real-time dashboards, live location tracking, vitals monitoring, and emergency SOS alerts. Built with Firebase for reliability. It's designed to keep seniors connected and safe while giving families peace of mind.";
  }
  
  if (msg.includes("feelmate")) {
    return "FeelMate is my emotional AI companion! It features a Hinglish chatbot, mood tracking, voice input, journaling, and mood-based music recommendations. It's like having an AI friend who understands your emotions and language. Built with modern AI integration.";
  }
  
  if (msg.includes("memory jar")) {
    return "Memory Jar is my voice-to-text diary app! You speak, it transcribes your memories using Web Speech API, stores them securely, and lets you export them as beautiful PDF storybooks. Perfect for preserving your stories and life moments.";
  }
  
  if (msg.includes("waste") || msg.includes("classifier")) {
    return "Waste Classifier is my AI project using CNN! It recognizes six different waste categories with a web UI for uploads and camera input. It was a great learning experience with machine learning and solving an environmental problem.";
  }

  // RUDE / ABUSIVE - polite professional responses (20+ variations)
  const rudeKeywords = ["idiot", "stupid", "shut up", "you suck", "damn", "useless", "waste", "pathetic", "fuck", "shit", "ass", "crap", "sucks", "terrible", "horrible", "annoying", "frustrat", "bullshit", "asshole", "pissed"];
  if (rudeKeywords.some(keyword => msg.includes(keyword))) {
    const rudeReplies = [
      "I'm here to help, not argue. Tell me what you actually need.",
      "Let's keep things simple. What would you like to do?",
      "I understand the frustration. What are you trying to achieve?",
      "I'll stay polite. How can I assist you right now?",
      "No worries. Let's reset. What do you want to know?",
      "I hear you. What's the main task you want help with?",
      "I'll respond calmly. Tell me your requirement.",
      "I can help you better if we keep it respectful.",
      "Let's move forward. What do you need?",
      "I'm still here to help. Just ask your question clearly.",
      "I'm not upset. Tell me how I can help you.",
      "Let's skip the rude part and focus on your project.",
      "I won't mirror that tone. Tell me your goal.",
      "Even if you're angry, I'm happy to help. What do you want?",
      "Let's keep things productive. What info do you need?",
      "I'm calm. Tell me what you're looking for.",
      "I'm here for your work, not for arguments.",
      "If something's not working, tell me what it is.",
      "We'll make more progress if we talk clearly. What's the task?",
      "It's all good. Let's focus on your project. How can I help?"
    ];
    return rudeReplies[Math.floor(Math.random() * rudeReplies.length)];
  }

  // HIRING RESPONSES - always push to contact
  if (msg.includes("hire") || msg.includes("hire you") || msg.includes("i want to hire") || msg.includes("i want to work with") || msg.includes("work with me") || msg.includes("start a project") || msg.includes("hire me")) {
    return "Amazing! You can hire me through my Contact Me page. Just share your project there.";
  }

  // PRICING - redirect to contact
  if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost") || msg.includes("how much")) {
    return "My pricing depends on your project. Share your requirements on my Contact Me page for an accurate quote.";
  }

  // SAMPLE / PORTFOLIO
  if (msg.includes("portfolio") || msg.includes("previous work") || msg.includes("show me your work") || msg.includes("samples") || msg.includes("examples")) {
    return "Sure! You can explore all my work on the Portfolio page.";
  }

  // CONTACT REDIRECTION LINES
  if (msg.includes("contact") || msg.includes("how can i contact") || msg.includes("reach you") || msg.includes("talk to you")) {
    return "You can contact me directly through my Contact Me page.";
  }

  // CALL_REQUEST
  if (msg.includes("call") || msg.includes("can i call you") || msg.includes("phone call") || msg.includes("can we talk on call") || msg.includes("can you call me") || msg.includes("talk on phone")) {
    return "I'd be happy to connect on a call. The easiest way is to request it through my Contact Me page – just drop a short message and I'll get back to you with a time.";
  }

  // WHATSAPP_REQUEST
  if (msg.includes("whatsapp") || msg.includes("whatsapp number") || msg.includes("talk on whatsapp") || msg.includes("text on whatsapp")) {
    return "You'll find my WhatsApp link on my Contact Me page – that's the best way to reach me quickly!";
  }

  // SMALL_TALK
  if (msg.includes("how are you") || msg.includes("what's up") || msg.includes("who made you") || msg.includes("do you sleep")) {
    return "I'm doing great, thanks for asking! 😄 Now, what brings you here—services, projects, or something else?";
  }

  if (msg.includes("youtube seo") || msg.includes("seo analyzer")) {
    return "My YouTube SEO Analyzer checks video titles, tags, and keyword density. It gives optimization suggestions with Hinglish support for Indian content creators. Great tool for boosting video visibility and ranking better on YouTube!";
  }

  if (msg.includes("editopia")) {
    return "Editopia Studio is my multimedia brand! We handle video editing, graphic design, and web solutions. Portfolio: studioeditopia.com. Whether you need cinematic reels, YouTube editing, or a website refresh, Editopia's got you covered.";
  }

  if (msg.includes("react") || msg.includes("next") || msg.includes("typescript") || msg.includes("javascript")) {
    return "React and Next.js are my main tech stack. I build fast, scalable apps with TypeScript and Tailwind CSS. React 19 is what I'm using now. Great for both frontend and full-stack work with Node.js on the backend.";
  }

  if (msg.includes("firebase") || msg.includes("database") || msg.includes("api") || msg.includes("backend")) {
    return "Firebase is perfect for rapid app development—I've used it for LifeSync and other projects. I also work with Node.js, Express, and databases. Proper architecture, authentication, and error handling are essential for solid backends.";
  }

  if (msg.includes("web") || msg.includes("develop") || msg.includes("code") || msg.includes("website") || msg.includes("app")) {
    return "Web development is my passion! I build landing pages, web apps, complex projects—you name it. React, Firebase, Tailwind—all modern tech. Full-stack capability means I handle frontend to backend. What are you building?";
  }
  
  if (msg.includes("design") || msg.includes("ui") || msg.includes("ux")) {
    return "Design and UX are core values for me! Clean, intuitive interfaces that convert are essential. Good design feels invisible—users just know it works. Every project gets that design-first mindset.";
  }
  
  // EXPERIENCE & QUALIFICATIONS
  if (msg.includes("experience") || msg.includes("background") || msg.includes("years")) {
    return "I'm pursuing BCA at Invertis University while working on real products. I've been doing video editing for several years with Editopia Studio, and web development is my core focus. Diverse experience from freelance work to building my own apps like LifeSync and FeelMate.";
  }
  
  if (msg.includes("portfolio") || msg.includes("project") || msg.includes("work") || msg.includes("case")) {
    return "My portfolio includes LifeSync, FeelMate, Memory Jar, Waste Classifier, YouTube SEO Analyzer—all real projects solving real problems. Editopia Studio work includes video content for various brands. You can see projects here on the site or at studioeditopia.com!";
  }
  
  if (msg.includes("testimonial") || msg.includes("review") || msg.includes("client") || msg.includes("feedback")) {
    return "I'm proud of the projects I've built and feedback has been great. Clients appreciate the attention to detail and creative approach. For Editopia Studio, creators keep coming back for more video work. Building products like LifeSync gives great satisfaction!";
  }
  
  // PRICING & AVAILABILITY
  if (msg.includes("price") || msg.includes("cost") || msg.includes("much") || msg.includes("rate") || msg.includes("charge")) {
    return "Pricing varies by project scope. Reels/Shorts through Editopia: $100-300. Longer videos: $500+. Web projects: $1-3k for landing pages, more for complex apps. Each project is unique. Fill out the contact form with your needs and I'll quote you!";
  }
  
  if (msg.includes("turnaround") || msg.includes("how long") || msg.includes("fast") || msg.includes("quick") || msg.includes("deadline")) {
    return "Reels/Shorts: 24-48 hours. Longer videos: 3-5 days. Web landing pages: 1-2 weeks. Complex projects take longer depending on scope. I can expedite if you need it urgent—just let me know when contacting!";
  }
  
  if (msg.includes("available") || msg.includes("when") || msg.includes("start") || msg.includes("book") || msg.includes("open")) {
    return "I'm currently accepting new projects! I can usually start pretty quickly depending on my workload. If you've got a timeline in mind, we can work it out. Use the contact form to reach out!";
  }
  
  // GETTING IN TOUCH
  if (msg.includes("hire") || msg.includes("work with") || msg.includes("work together") || msg.includes("collaborate") || msg.includes("contact") || msg.includes("reach")) {
    return "Awesome! Check out the contact form on the site. Tell me what you need—video editing, web development, or something else. Include your timeline and budget if possible. I'll respond within 24 hours and we can discuss details.";
  }
  
  if (msg.includes("skill") || msg.includes("tool") || msg.includes("software") || msg.includes("tech") || msg.includes("stack")) {
    return "Video: Adobe Premiere Pro, DaVinci Resolve, motion graphics. Web: React, Next.js, TypeScript, Tailwind CSS, Firebase, Node.js. Also: Web Speech API, Chart.js, Google Maps API, Git/GitHub. Pretty comprehensive toolkit!";
  }
  
  if (msg.includes("discount") || msg.includes("bulk") || msg.includes("package")) {
    return "For bulk or ongoing work, we can definitely discuss packages or better rates! Multiple videos for Editopia or a bigger web project—happy to work out something that works for both of us.";
  }
  
  if (msg.includes("process") || msg.includes("workflow") || msg.includes("how")) {
    return "Process is pretty straightforward! For video: discuss your vision, you provide files, I edit, revision rounds. For web: we plan features, I build, test, and launch. Both collaborative and efficient. Communication is key!";
  }

  // Generic fallback - 100+ varied confused-input replies with random selection
  const confusedReplies = [
    "Hmm, I'm not sure I understood that. Could you rephrase?",
    "That message confused me a bit 😅 Can you say it again?",
    "I didn't fully get that — what exactly do you need?",
    "That went over my head. Want to try saying it differently?",
    "I'm not sure what you mean. Are you asking about my services?",
    "Could you explain that a bit more?",
    "I lost you there. What's the goal?",
    "Not sure what that means. Need website or video editing help?",
    "I don't understand that clearly. Can you clarify?",
    "That seems incomplete. What are you trying to ask?",
    "I didn't catch that. Can you try again?",
    "I might need more detail on that.",
    "Confusing message 😅 Can you simplify it for me?",
    "I'm not sure how to answer that. What do you need exactly?",
    "Let's try again — what are you looking for?",
    "That doesn't match anything I know. Want to see my services?",
    "I don't have a reply for that one. Try asking something else.",
    "That looks random — what's your actual question?",
    "I couldn't match that. Looking to start a project?",
    "I don't understand. Want to check my projects or contact me?",
    "That seems unclear. What are you trying to accomplish?",
    "Hmm, that message didn't make sense to me.",
    "Let's reset — what do you need help with?",
    "Hard to answer that. Try again?",
    "I'm confused too 😄 What are you asking?",
    "Can you break that into a shorter question?",
    "That wasn't clear. Want to see my portfolio?",
    "I didn't get the meaning of that.",
    "Try asking me something about my work!",
    "I didn't fully follow. What do you want?",
    "Still not clear. Want services or contact info?",
    "I'm here, but I didn't understand that.",
    "That didn't connect. What's the purpose?",
    "Not sure what that relates to. Guide me?",
    "I can't respond properly — need more clarity.",
    "Let's make it simple: website or video editing?",
    "Try sending it again in a different way.",
    "This seems unrelated. What's your project?",
    "I'm unsure what that meant.",
    "That looks random 😅 Want to talk about your project?",
    "Message unclear — try again?",
    "Confusing text detected. What do you actually need?",
    "Let's restart — what's your goal?",
    "My brain glitched 😂 Try retyping?",
    "Not sure. Can you explain what you want?",
    "That didn't sound like a real question.",
    "I'm lost 😄 Can you say it differently?",
    "I might need more context.",
    "That didn't help me understand your requirement.",
    "Not sure what that meant — clarify?",
    "I can't guess from that message.",
    "That wasn't very clear. Try again?",
    "Hmm, didn't understand. Need a website or editing?",
    "I'm confused — what should I help with?",
    "Didn't get that. Want my services?",
    "That message didn't make sense.",
    "Try telling me in simple words.",
    "Unsure how to respond to that.",
    "Looks like a typo. Try again?",
    "Still unclear 😅 What do you want?",
    "Didn't catch that. What's the topic?",
    "Help me understand — what's the main question?",
    "That's outside my understanding.",
    "Message unclear. Want to see my work?",
    "Tell me the exact thing you're looking for.",
    "Not getting it. Try again?",
    "Tell me what help you need.",
    "I'm a bit confused. Clarify?",
    "Not sure how to interpret that.",
    "Say it in a different way?",
    "That message didn't have enough info.",
    "Need more details to respond.",
    "Not clear. Want to hire me?",
    "I don't recognize that request.",
    "What's the purpose of your message?",
    "Try giving me a clearer question.",
    "I didn't understand that message at all 😅",
    "Confusing input detected 😂",
    "Let's try again — what do you want from me?",
    "That wasn't specific enough.",
    "I think something got mistyped.",
    "Want to explore my portfolio?",
    "Not sure what you meant.",
    "Unclear message. Try again?",
    "Let's simplify this — what's your question?",
    "That statement doesn't fit any topic I know.",
    "Say it in another way?",
    "Try giving one clear line.",
    "Didn't get it. Want pricing or portfolio?",
    "I'm here to help, but I need clarity.",
    "This looks incomplete.",
    "Did you mean to ask something about my services?",
    "I didn't follow — try again?",
    "Not enough info. Tell me more.",
    "What exactly are you trying to find?",
    "I want to answer properly — help me understand.",
    "That was unclear 😅",
    "Try rephrasing your message.",
    "I couldn't decode that.",
    "Let's try this again—what do you want to do?"
  ];
  
  return confusedReplies[Math.floor(Math.random() * confusedReplies.length)];
};

// End of geminiService fallbacks

