import { AlertCircle, Lightbulb } from "lucide-react";

interface ExpertTipsProps {
  category: string;
}

const tipsData: Record<string, { tips: string[]; mistakes: string[] }> = {
  "weight-loss": {
    tips: [
      "Keep your heart rate elevated by minimizing rest between sets.",
      "Focus on compound movements to maximize caloric burn.",
      "Stay hydrated before, during, and after your workout."
    ],
    mistakes: [
      "Overestimating calories burned during the session.",
      "Neglecting strength training in favor of only cardio.",
      "Not eating enough protein to preserve muscle mass."
    ]
  },
  "muscle-gain": {
    tips: [
      "Progressive overload is key: aim to lift slightly more weight or do more reps each week.",
      "Focus on the eccentric (lowering) phase of the movement.",
      "Ensure you are in a slight caloric surplus with adequate protein."
    ],
    mistakes: [
      "Lifting too heavy with poor form, risking injury.",
      "Not allowing enough recovery time between sessions for the same muscle group.",
      "Skipping meals or undereating."
    ]
  },
  "toning": {
    tips: [
      "Combine moderate weights with higher repetitions (12-15 reps).",
      "Incorporate supersets to keep intensity high.",
      "Maintain a balanced diet to reduce body fat while keeping muscle."
    ],
    mistakes: [
      "Believing you can 'spot reduce' fat from specific areas.",
      "Using weights that are too light to stimulate the muscle.",
      "Relying solely on isolation exercises instead of compound lifts."
    ]
  },
  "flexibility": {
    tips: [
      "Breathe deeply into each stretch; do not hold your breath.",
      "Warm up your muscles with light cardio before static stretching.",
      "Consistency is more important than intensity when stretching."
    ],
    mistakes: [
      "Bouncing or forcing a stretch (ballistic stretching) which can cause injury.",
      "Stretching cold muscles.",
      "Ignoring asymmetrical tightness (stretching both sides equally even if one is tighter)."
    ]
  },
  "strength": {
    tips: [
      "Rest 2-3 minutes between heavy sets to allow full ATP recovery.",
      "Brace your core and maintain intra-abdominal pressure during heavy lifts.",
      "Prioritize barbell exercises like squats, deadlifts, and presses."
    ],
    mistakes: [
      "Sacrificing form to lift a heavier weight (ego lifting).",
      "Doing too much volume (too many exercises/sets) in a single session.",
      "Inconsistent training frequency."
    ]
  }
};

export default function ExpertTips({ category }: ExpertTipsProps) {
  const data = tipsData[category] || tipsData["strength"]; // Fallback to strength

  return (
    <div className="space-y-6 mt-12">
      <div className="bg-[#243447] rounded-2xl p-6 border border-white/5 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#FF8C00]/20 rounded-lg">
            <Lightbulb className="h-6 w-6 text-[#FF8C00]" />
          </div>
          <h3 className="text-xl font-bold text-white">Expert Tips</h3>
        </div>
        <ul className="space-y-3 text-gray-300">
          {data.tips.map((tip, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-[#FF8C00] font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#2d4258]/50 rounded-2xl p-6 border border-red-500/20 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Common Mistakes</h3>
        </div>
        <ul className="space-y-3 text-gray-300">
          {data.mistakes.map((mistake, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-red-500 font-bold">×</span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
