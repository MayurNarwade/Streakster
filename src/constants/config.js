export const ENERGY_LEVELS = {
  CRITICAL: { value: 'critical', label: 'Critical', color: 'red', emoji: '🔥' },
  HIGH: { value: 'high', label: 'High', color: 'green', emoji: '⚡' },
  MEDIUM: { value: 'medium', label: 'Medium', color: 'yellow', emoji: '🌟' },
  LOW: { value: 'low', label: 'Low', color: 'blue', emoji: '💧' },
  EXHAUSTED: { value: 'exhausted', label: 'Exhausted', color: 'gray', emoji: '😴' },
};

export const MOOD_TYPES = {
  FOCUSED: { value: 'focused', label: 'Focused', color: 'indigo', emoji: '🎯' },
  CALM: { value: 'calm', label: 'Calm', color: 'teal', emoji: '😌' },
  CREATIVE: { value: 'creative', label: 'Creative', color: 'violet', emoji: '🎨' },
  STRESSED: { value: 'stressed', label: 'Stressed', color: 'orange', emoji: '😰' },
  TIRED: { value: 'tired', label: 'Tired', color: 'blue', emoji: '😪' },
  ENERGETIC: { value: 'energetic', label: 'Energetic', color: 'lime', emoji: '💪' },
};

export const CATEGORIES = [
  { value: 'personal', label: 'Personal', color: 'blue' },
  { value: 'work', label: 'Work', color: 'orange' },
  { value: 'study', label: 'Study', color: 'violet' },
  { value: 'shopping', label: 'Shopping', color: 'green' },
  { value: 'health', label: 'Health', color: 'red' },
  { value: 'social', label: 'Social', color: 'pink' },
  { value: 'creative', label: 'Creative', color: 'yellow' },
  { value: 'finance', label: 'Finance', color: 'lime' },
];

export const PRIORITIES = [
  { value: 'critical', label: 'Critical', color: 'red', level: 5 },
  { value: 'high', label: 'High', color: 'orange', level: 4 },
  { value: 'medium', label: 'Medium', color: 'yellow', level: 3 },
  { value: 'low', label: 'Low', color: 'blue', level: 2 },
  { value: 'someday', label: 'Someday', color: 'gray', level: 1 },
];

export const AI_MODES = [
  { value: 'assistant', label: 'AI Assistant' },
  { value: 'ghost', label: 'Ghost Mode' },
  { value: 'focus', label: 'Deep Focus' },
  { value: 'crisis', label: 'Crisis Mode' },
  { value: 'relax', label: 'Wind Down' },
];

export const VIEW_MODES = {
  LIST: 'list',
  GRID: 'grid',
  RIVER: 'river',
  TIMELINE: 'timeline'
};