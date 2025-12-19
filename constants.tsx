
import { DayConfig } from './types';

export const COLORS = {
  bg: '#050a05',
  card: '#0a110a',
  accent: '#22c55e', 
  accentDark: '#166534',
  textMuted: '#94a3b8',
};

export const CHALLENGE_DAYS: DayConfig[] = [
  {
    dayNumber: 1,
    title: "INTO THE FASTLANDZ",
    subtitle: "SURVIVE THE NIGHT",
    fastDuration: 12,
    habit: "Blackout Protocol",
    habitDescription: "No fuel intake 3 hours before sleep.",
    habitScience: "Stopping fuel intake early allows insulin levels to drop, signaling the body to switch from storage mode to maintenance mode.",
    intelTitle: "Why late-night fuel slows you down.",
    intelContent: "When you eat late, your body stores energy instead of repairing the engine. Insulin spikes block the repair crews (autophagy) from entering the garage.",
    physiologicalEffect: "Lowering nighttime insulin improves Growth Hormone secretion, vital for tissue repair.",
    objective: "Survive the night. Your engine needs rest.",
    bonusTip: "Black coffee and herbal tea are safe zones. Anything else breaks the seal.",
    survivalAdvice: "The first night is the quietest. Listen to your body, not your cravings.",
    protocols: [
      { id: 'd1p1', label: '12-Hour Fast Completed', desc: 'Survive the first blackout window.' },
      { id: 'd1p2', label: 'No Night Fuel', desc: 'Stop eating 3 hours before sleep.' },
      { id: 'd1p3', label: 'Hydrate', desc: 'Drink water like a camel with trauma.' }
    ]
  },
  {
    dayNumber: 2,
    title: "DEFEAT THE GLUCOSE GOBLIN",
    subtitle: "THE PROVING GROUND",
    fastDuration: 14,
    habit: "Flood Control",
    habitDescription: "Drink 500ml water upon waking.",
    habitScience: "Rehydrating immediately kickstarts metabolic rate and flushes waste.",
    intelTitle: "Insulin 101: You're not broken.",
    intelContent: "High insulin blocks fat burning. Lowering it unlocks your body's energy stores. Stop feeding the goblin and your body will eat its own fat for fuel.",
    physiologicalEffect: "Your body is a hybrid engine. Today, we burn sugar reserves.",
    objective: "Let the goblin starve. Switch to clean fuel.",
    bonusTip: "Add a pinch of salt to your water. It helps replenish electrolytes.",
    survivalAdvice: "Hunger is just a sensation. It is not an emergency.",
    protocols: [
      { id: 'd2p1', label: 'Complete 14-Hour Fast', desc: 'Close the eating window.' },
      { id: 'd2p2', label: 'Zero Sugary Drinks', desc: 'Strict enforcement. No soda, no juice.' },
      { id: 'd2p3', label: 'Movement: 2,000 Steps', desc: 'Scout the perimeter. Keep the blood flowing.' }
    ]
  },
  {
    dayNumber: 3,
    title: "WATER WARRIOR",
    subtitle: "THE WASTELAND TREK",
    fastDuration: 14,
    habit: "Tactical Movement",
    habitDescription: "15-minute fasted walk to drain glycogen.",
    habitScience: "Low-intensity movement while fasted forces the muscles to use stored sugar.",
    intelTitle: "The Mirage of Hunger",
    intelContent: "In the Fastlandz, your body's signals can be as deceptive as a desert mirage. Often when you think you need rations, your engine is just overheating and needs coolant (water).",
    physiologicalEffect: "Hydration improves energy and significantly reduces hunger confusion.",
    objective: "Survive the heat, hydrate the machine.",
    bonusTip: "If you feel dizzy, the Mineral Shield protocol is failing. Increase salt.",
    survivalAdvice: "Fuel reserves low, but the destination is near. Hold the line, Survivor.",
    protocols: [
      { id: 'd3p1', label: '14-Hour Fast in Progress', desc: 'Maintain the metabolic gap.' },
      { id: 'd3p2', label: 'Water Rations: 8 Cups', desc: 'Master the most precious resource.' },
      { id: 'd3p3', label: 'Movement Goal: 1,420 Steps', desc: 'Keep distance from the hunger zones.' }
    ]
  },
  {
    dayNumber: 4,
    title: "SNACK ASSASSIN",
    subtitle: "IDENTIFY THE ENEMY",
    fastDuration: 16,
    habit: "Mineral Shield",
    habitDescription: "Add a pinch of sea salt to your water.",
    habitScience: "Sodium prevents 'Keto Flu' and keeps electrical signals firing correctly.",
    intelTitle: "Why We Kill Snacks",
    intelContent: "Snacking is the silent killer of your fasting momentum. Every bite spikes insulin, shutting down fat burning immediately and resetting your metabolic clock.",
    physiologicalEffect: "Your body is shifting gears. You're adapting to 16-hour windows.",
    objective: "Eliminate the urge. Keep the engine running pure.",
    bonusTip: "The hunger comes in waves. Surf the wave, it will pass in 15 mins.",
    survivalAdvice: "Identify the enemy. Eliminate the urge. Keep the engine running pure.",
    protocols: [
      { id: 'd4p1', label: '16-Hour Fast Completed', desc: 'Target acquired and neutralized.' },
      { id: 'd4p2', label: 'NO Snacking Between Meals', desc: 'Zero tolerance policy.' },
      { id: 'd4p3', label: 'Move 3,000 Steps', desc: 'Scout the perimeter.' }
    ]
  },
  {
    dayNumber: 5,
    title: "THE CARB RECKONING",
    subtitle: "PREPARE FOR THE PURGE",
    fastDuration: 18,
    habit: "The Green Transition",
    habitDescription: "Break fast with fiber and protein—no carbs.",
    habitScience: "Starting with fiber blunts the insulin response and prevents storage spikes.",
    intelTitle: "Carbs aren't evil, but they're clingy.",
    intelContent: "When you consume refined sugars, your system is flooded with cheap energy. Your body screams to store fat rather than burn it. Today, we cut the cord.",
    physiologicalEffect: "Your mind is sharper than a blade in the sun.",
    objective: "Break the chains of refined sugar. Retake control.",
    bonusTip: "Eat whole foods (protein & fats) before your fast begins to digest slowly.",
    survivalAdvice: "The hunger is a ghost. Walk right through it.",
    protocols: [
      { id: 'd5p1', label: 'Warrior Class: 18-Hour Fast', desc: 'Extended deprivation for maximum autophagy.' },
      { id: 'd5p2', label: 'Purge Refined Carbs', desc: 'Absolute zero tolerance. No bread, pasta, or cereal.' },
      { id: 'd5p3', label: 'Movement Protocol: 4,000 Steps', desc: 'Hit the wasteland hard.' }
    ]
  },
  {
    dayNumber: 6,
    title: "THE 20-HOUR TRIAL",
    subtitle: "THE LONG HAUL",
    fastDuration: 20,
    habit: "Sensory Silence",
    habitDescription: "Eat your meals in total silence.",
    habitScience: "Mindful eating lowers stress hormones that block fat loss.",
    intelTitle: "Autophagy: Cellular Housekeeping",
    intelContent: "Think of it as stripping parts from a broken-down vehicle to repair the main rig. Your body identifies old, damaged proteins and dysfunctional cells, breaking them down for energy.",
    physiologicalEffect: "The body adapts only when forced. You're entering the threshold of the elite.",
    objective: "Welcome to the deep end. Today we push limits.",
    bonusTip: "Breathe deep. Hydrate often. Patience is your most valuable resource today.",
    survivalAdvice: "To the wasteland, nothing is wasted. Your body becomes the ultimate scavenger.",
    protocols: [
      { id: 'd6p1', label: 'The Warrior Window', desc: 'Complete a strict 20-hour fast.' },
      { id: 'd6p2', label: 'One Meal Only (OMAD)', desc: 'Protein + Fat heavy. Fuel the engine for repair.' },
      { id: 'd6p3', label: 'Scavenger Walk', desc: 'Minimum 7,000 steps to keep the engine moving.' }
    ]
  },
  {
    dayNumber: 7,
    title: "BOSS FIGHT",
    subtitle: "THE ULTIMATE HAUL",
    fastDuration: 24,
    habit: "Victory Feast",
    habitDescription: "Log your 24h+ fast and plan a feast.",
    habitScience: "Maximum stem cell activation occurs in the final hours of a 24-hour fast.",
    intelTitle: "The Metabolic Rebirth",
    intelContent: "After 24 hours without food, your body shifts gears completely. Glycogen stores are depleted, and your liver begins producing ketones heavily. This is the self-eating process where cells recycle waste material.",
    physiologicalEffect: "Uncharted territory. You have reached the Oasis.",
    objective: "The 24-Hour Battle. Survive the wasteland.",
    bonusTip: "Sip warm bone broth if you need a 'crutch' to make it through the night.",
    survivalAdvice: "The engine is running clean, survivor. You are entering the final sector.",
    protocols: [
      { id: 'd7p1', label: 'The Long Haul', desc: 'Fast for 24 hours (Full Day).' },
      { id: 'd7p2', label: 'Break Fast Strategy', desc: 'Light meal first. Do not push limits immediately.' },
      { id: 'd7p3', label: 'Conservation', desc: 'Gentle walk or stretch only.' }
    ]
  }
];
