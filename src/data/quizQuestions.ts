import type { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which activity has the biggest carbon footprint per hour?",
    options: ["Driving a car", "Taking a flight", "Using a laptop", "Eating a burger"],
    correctIndex: 1,
    explanation: "Air travel emits about 150g CO2 per km per passenger, making it the highest per-hour activity.",
  },
  {
    id: 2,
    question: "How much CO2 does the average person emit per year?",
    options: ["0.5 tons", "4.5 tons", "12 tons", "25 tons"],
    correctIndex: 1,
    explanation: "The global average is about 4.8 tons per person annually, though this varies greatly by country.",
  },
  {
    id: 3,
    question: "Which food has the lowest carbon footprint per serving?",
    options: ["Beef", "Chicken", "Lentils", "Eggs"],
    correctIndex: 2,
    explanation: "Lentils produce only about 0.2 kg CO2 per serving compared to beef at 3.3 kg!",
  },
  {
    id: 4,
    question: "What percentage of global emissions come from energy production?",
    options: ["20%", "45%", "73%", "90%"],
    correctIndex: 2,
    explanation: "Energy production accounts for about 73% of global greenhouse gas emissions.",
  },
  {
    id: 5,
    question: "Which is the most effective personal action to reduce emissions?",
    options: ["Recycling", "Using LED bulbs", "Reducing air travel", "Buying local food"],
    correctIndex: 2,
    explanation: "Reducing air travel can save the most CO2 per action — one less long-haul flight saves 1-3 tons!",
  },
];
