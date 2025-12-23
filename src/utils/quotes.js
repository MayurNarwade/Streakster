export const motivationQuotes = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Small daily improvements are the key to staggering long-term results.",
    author: "Robin Sharma"
  },
  {
    text: "Don't break the chain. Keep building momentum.",
    author: "Jerry Seinfeld"
  },
  {
    text: "Consistency is what transforms average into excellence.",
    author: "Anonymous"
  },
  {
    text: "Your future is created by what you do today, not tomorrow.",
    author: "Robert Kiyosaki"
  },
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Anonymous"
  },
  {
    text: "Small steps every day lead to big results.",
    author: "Anonymous"
  },
  {
    text: "Your resolution success is measured by daily consistency.",
    author: "Anonymous"
  }
];

export const streakMessages = [
  "Great start! First step is the hardest.",
  "Building momentum! Keep going!",
  "On fire! You're building a strong habit.",
  "Amazing consistency! Don't break the chain!",
  "Unstoppable! You're mastering this habit.",
  "Legendary streak! You're an inspiration!",
  "Perfect consistency! You're achieving your goals!"
];

export const getRandomQuote = () => {
  return motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
};

export const getStreakMessage = (streak) => {
  if (streak === 0) return "Start your streak today!";
  if (streak < 3) return streakMessages[0];
  if (streak < 7) return streakMessages[1];
  if (streak < 14) return streakMessages[2];
  if (streak < 30) return streakMessages[3];
  if (streak < 60) return streakMessages[4];
  if (streak < 100) return streakMessages[5];
  return streakMessages[6];
};

export const defaultHabits = [
  {
    id: 1,
    name: "Morning Meditation",
    category: "Mindfulness",
    target: 1,
    completedToday: false,
    streak: 0,
    longestStreak: 0,
    weeklyProgress: [false, false, false, false, false, false, false]
  },
  {
    id: 2,
    name: "Drink 8 glasses of water",
    category: "Health",
    target: 8,
    current: 0,
    completedToday: false,
    streak: 0,
    longestStreak: 0,
    weeklyProgress: [false, false, false, false, false, false, false]
  },
  {
    id: 3,
    name: "Exercise for 30 mins",
    category: "Fitness",
    target: 1,
    completedToday: false,
    streak: 0,
    longestStreak: 0,
    weeklyProgress: [false, false, false, false, false, false, false]
  },
  {
    id: 4,
    name: "Read 10 pages",
    category: "Learning",
    target: 1,
    completedToday: false,
    streak: 0,
    longestStreak: 0,
    weeklyProgress: [false, false, false, false, false, false, false]
  }
];