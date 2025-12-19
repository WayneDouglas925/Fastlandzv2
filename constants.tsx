
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
    fullEducation: "Welcome to the FASTLANDS. This isn't a diet. This is survival training for your metabolism.\n\nTonight, you stop eating after dark. Why? Because your ancestors didn't have 24/7 access to food. They didn't snack at midnight. Their bodies learned to burn fat instead of begging for more carbs.\n\nYour body has two fuel sources: sugar (easy, burns fast) and fat (harder to access, burns clean). Right now, you're running on sugar. After 12 hours without food, your body starts switching to fat. This is called metabolic flexibility, and most people have lost it.\n\nThe 12-hour fast is your entry point. It's not hard. It's a test: Can you stop eating when your body doesn't actually need food? Can you tell the difference between hunger and boredom?\n\nExpect: Mild hunger around hour 10-11. Ignore it. Drink water. Go to bed. Wake up stronger.\n\nRemember: Hunger is temporary. Discipline is permanent.",
    milestoneHours: [10, 12],
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
    fullEducation: "Every time you eat, insulin shows up. Its job? Lock away energy as fat and keep you dependent on the next meal.\n\nInsulin isn't evil—it's doing its job. But when it's constantly elevated (because you're constantly eating), your body never gets a chance to burn stored fat. You're locked in a cycle: eat, store, crave, repeat.\n\nFasting drops insulin. At 14 hours, it's low enough that your body can finally access fat stores. This is why you might feel a surge of energy around this mark—you're no longer waiting for food. You're running on your reserves.\n\nToday's challenge: No sugary drinks. Not even \"healthy\" ones. Orange juice, smoothies, sports drinks—they all spike insulin and reset your progress. Black coffee and water only.\n\nExpect: Cravings will hit. This is your brain, used to constant fuel, throwing a tantrum. It will pass.\n\nThe goal isn't to suffer. It's to teach your body it doesn't need to eat every 3 hours.",
    milestoneHours: [12, 14],
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
    fullEducation: "Most people mistake thirst for hunger. Your brain sends a signal: \"I need something.\" You assume it's food. It's not. It's water.\n\nDehydration makes fasting harder. It causes headaches, brain fog, and false hunger signals. It slows your metabolism. It makes you weak when you should be getting stronger.\n\nToday's mission: 8 cups of water minimum. Not all at once—spread it out. First thing in the morning, between meals, before bed. Add a pinch of salt if you're feeling lightheaded (you're flushing electrolytes).\n\nWhy this matters: Fat burning produces waste products. Water flushes them out. Without it, you feel like garbage even though you're doing everything right.\n\nExpect: More bathroom trips. That's the point. You're flushing out years of metabolic sludge.\n\nPro tip: When you think you're hungry at hour 12, drink a full glass of water and wait 10 minutes. 80% of the time, the hunger disappears.",
    milestoneHours: [10, 14],
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
    fullEducation: "Welcome to the turning point. 16 hours is when your body realizes: \"Oh, we're serious about this.\"\n\nUp until now, you've been in the shallow end—burning through stored glycogen (sugar reserves). At 16 hours, glycogen is depleted. Your liver starts converting fat into ketones—a cleaner, more efficient fuel source.\n\nThis is metabolic flexibility: the ability to switch between sugar and fat as fuel. Most people are metabolically rigid—they can only run on carbs, which is why they're constantly hungry.\n\nExpect: A strange clarity around hour 14-16. Your brain runs well on ketones. Some people call it \"fasting euphoria.\" It's not magic—it's biochemistry.\n\nToday's rule: No snacking. None. Not even \"healthy\" snacks. Every time you eat, you reset the clock. Your body needs uninterrupted time to make the shift.\n\nThe hardest part of fasting isn't hunger. It's breaking the habit of eating out of boredom, stress, or routine. Today, you confront that habit.",
    milestoneHours: [14, 16],
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
    fullEducation: "Carbs aren't inherently bad. But if your goal is to burn fat, carbs are working against you.\n\nHere's why: Every gram of carbohydrate you eat gets converted to glucose (sugar). Glucose spikes insulin. Insulin stops fat burning. Even if you fast for 16 hours, a carb-heavy meal before the fast means you spend most of those hours just clearing glucose—not burning fat.\n\nToday's challenge: Eat protein and fat before your fast. Eggs, meat, avocado, nuts. Skip the bread, pasta, rice, and sugar. Notice how different the fast feels.\n\nExpect: Less hunger. Fat and protein digest slower, keeping you full longer. Carbs digest fast and leave you craving more.\n\nThis isn't about going zero-carb forever. It's about understanding how fuel choice impacts your fast. High-carb meals before fasting = harder fasts. High-fat, moderate-protein meals = easier fasts.\n\nYour metabolism is an engine. Carbs are starter fluid—quick, dirty, unsustainable. Fat is diesel—slow, clean, efficient.",
    milestoneHours: [12, 16],
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
    fullEducation: "Today is the longest fast yet: 20 hours. This is where casual fasters quit and serious ones level up.\n\nAt 20 hours, you're in deep ketosis. Fat burning is maxed out. But more importantly, autophagy kicks in—your body's cellular cleanup process. Old, damaged cells get recycled. Inflammation drops. Your immune system gets stronger.\n\nYou can't buy this in a supplement. You can't shortcut it with a \"detox tea.\" The only way to trigger deep autophagy is to stop eating long enough for your body to prioritize repair over digestion.\n\nToday's protocol: One meal only. Protein + fat-focused. Keep it simple—steak and eggs, salmon and avocado, whatever works. Eat until satisfied, not stuffed.\n\nExpect: The hardest part is between hours 14-18. After that, hunger often fades. Your body adjusts. Mental clarity peaks.\n\nThis is the test: Can you function on one meal? Can you separate eating from entertainment? Can you sit with discomfort without reaching for food?\n\nIf you make it through today, Day 7 is just a formality.",
    milestoneHours: [16, 20],
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
    fullEducation: "This is it. The 24-hour fast. Most people never attempt this. Not because it's impossible—because they're mentally weak.\n\nYou've spent 6 days training for this moment. You know what hunger feels like at hour 12. You know the clarity at hour 16. You know the power of 20 hours. Now you push past all of it.\n\nPhysiologically, 24 hours is where maximum fat oxidation occurs. Growth hormone spikes. Autophagy runs at full capacity. Your body is literally rebuilding itself while you do nothing but wait.\n\nBut this isn't about the science. It's about proving to yourself that you control your body—it doesn't control you.\n\nThe hardest hour? Hour 18-22. That's when your brain will try every trick to make you quit. \"Just a small snack won't hurt.\" \"You've already proven yourself.\" \"This is extreme.\"\n\nIgnore it. That voice is the enemy. It's the same voice that kept you weak before you started.\n\nProtocol: Fast through the day and night. Break your fast tomorrow morning. Hydrate aggressively. Add electrolytes (salt, magnesium, potassium) if you feel dizzy. Walk if you need to move. Rest if you're tired.\n\nExpect: A rollercoaster. Moments of doubt. Waves of hunger. But also—clarity, pride, and a strange sense of calm. You're doing something most people are too scared to try.\n\nWhen you finish, you'll know: You're not like most people anymore.\n\nWelcome to the other side of the wasteland.",
    milestoneHours: [18, 20, 24],
    protocols: [
      { id: 'd7p1', label: 'The Long Haul', desc: 'Fast for 24 hours (Full Day).' },
      { id: 'd7p2', label: 'Break Fast Strategy', desc: 'Light meal first. Do not push limits immediately.' },
      { id: 'd7p3', label: 'Conservation', desc: 'Gentle walk or stretch only.' }
    ]
  }
];
