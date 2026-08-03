export const siteContent = {
  meta: {
    title: "Happy Birthday, Whimssy ❤️",
    description: "A deeply romantic birthday surprise for Ruth Joy.",
  },
  music: {
    path: "/audio/romantic-song.mp3", // Place your MP3 in public/audio/
    title: "Our Song",
  },
  opening: {
    title: "For My Whimssy",
    buttonText: "Open Your Surprise",
  },
  hero: {
    nickname: "Whimssy",
    name: "Ruth Joy",
    subtitle: "The love of my life.",
    date: "August 5",
  },
  countdown: {
    // Uses the next occurrence of August 5 relative to current date if passed, or just "August 5"
    targetMonth: 7, // 0-indexed, so 7 is August
    targetDate: 5,
    message: "Waiting to celebrate you...",
    birthdayMessage: "Happy Birthday, My Whimssy! 🎂❤️",
  },
  story: {
    title: "Our Journey",
    milestones: [
      {
        id: 1,
        date: "The Beginning",
        title: "When We Met",
        description: "The day my life changed forever. I remember seeing you and knowing this was the start of something beautiful.",
        icon: "camera", 
      },
      {
        id: 2,
        date: "Our First Date",
        title: "Endless Conversations",
        description: "Hours felt like minutes. We talked about everything and nothing, and I never wanted the day to end.",
        icon: "coffee",
      },
      {
        id: 3,
        date: "The Yes",
        title: "Making It Official",
        description: "You said yes to being mine, and suddenly all the love songs made perfect sense.",
        icon: "heart",
      },
      {
        id: 4,
        date: "Today",
        title: "Growing Together",
        description: "Every day with you is a gift. You are my greatest adventure and my safest home.",
        icon: "star",
      }
    ]
  },
  memories: {
    title: "Beautiful Moments",
    photos: [
      { id: 1, url: "/photos/placeholder-1.jpg", caption: "Our first trip together" },
      { id: 2, url: "/photos/placeholder-2.jpg", caption: "That amazing dinner date" },
      { id: 3, url: "/photos/placeholder-3.jpg", caption: "Just us being silly" },
      { id: 4, url: "/photos/placeholder-4.jpg", caption: "A perfect sunset" },
      { id: 5, url: "/photos/placeholder-5.jpg", caption: "My favorite smile in the world" },
      { id: 6, url: "/photos/placeholder-6.jpg", caption: "Unforgettable memories" },
    ]
  },
  reasons: {
    title: "Why I Love You",
    items: [
      { id: 1, title: "Your Smile", text: "It lights up my darkest days and makes everything better." },
      { id: 2, title: "Your Kindness", text: "The way you care for others inspires me to be a better person." },
      { id: 3, title: "Your Passion", text: "Seeing you do what you love is the most attractive thing in the world." },
      { id: 4, title: "Our Connection", text: "We don't even need words sometimes. You just get me." },
      { id: 5, title: "Your Laugh", text: "My absolute favorite sound in the entire universe." },
      { id: 6, title: "Your Heart", text: "You have the most beautiful, pure heart I've ever known." },
    ]
  },
  letter: {
    title: "A Letter To You",
    paragraphs: [
      "My dearest Ruth Joy,",
      "As you celebrate another year of life, I want to take a moment to celebrate YOU. From the moment you walked into my life, everything changed. You brought color to my world, laughter to my days, and a love so deep I didn't know it was possible.",
      "You are my safe space, my biggest cheerleader, and my best friend. I love your quirks, your dreams, and the way your nose crinkles when you laugh. I love the person I am when I'm with you.",
      "Today is all about you. I promise to spend today, and every day after, making sure you know just how incredibly loved, cherished, and special you are.",
      "Happy Birthday, my Whimssy. Here's to a lifetime of birthdays together.",
      "Forever Yours,"
    ]
  },
  wish: {
    title: "Make a Wish",
    instruction: "Tap the cake to blow out the candles and make your birthday wish.",
    wishedMessage: "May all your dreams come true, my love! ✨"
  },
  footer: {
    text: "Made with all my love for Ruth Joy.",
  }
};
