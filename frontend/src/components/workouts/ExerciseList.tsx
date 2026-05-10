"use client";

import { useState } from "react";
import { Exercise } from "@/interfaces/workout";
import ExerciseCard from "./ExerciseCard";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Timer, Play, Pause, RotateCcw } from "lucide-react";

interface Props {
  exercises: Exercise[];
}

export default function ExerciseList({ exercises }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // For rest timer

  const [restTimer, setRestTimer] = useState<{ active: boolean; seconds: number }>({ active: false, seconds: 0 });

  const startRest = (seconds: number = 60) => {
    setRestTimer({ active: true, seconds });
    const interval = setInterval(() => {
      setRestTimer(prev => {
        if (prev.seconds <= 1) {
          clearInterval(interval);
          return { active: false, seconds: 0 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
  };

  const toggleComplete = (id: number) => {
    const wasCompleted = completedExercises.includes(id);
    setCompletedExercises(prev => 
      wasCompleted ? prev.filter(i => i !== id) : [...prev, id]
    );
    
    if (!wasCompleted) {
      startRest(60); // Start 60s rest after completing an exercise
    }
  };

  const progress = (completedExercises.length / exercises.length) * 100;

  return (
    <div className="space-y-6 relative">
      {/* Floating Rest Timer */}
      <AnimatePresence>
        {restTimer.active && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#FF8C00] text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-white/20 backdrop-blur-xl"
          >
            <Timer className="w-6 h-6 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-tighter opacity-80">Rest Period</span>
              <span className="text-2xl font-black tabular-nums">{restTimer.seconds}s</span>
            </div>
            <button 
              onClick={() => setRestTimer({ active: false, seconds: 0 })}
              className="ml-4 p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          Exercise List <span className="text-[#FF8C00] ml-2">({exercises.length})</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400 uppercase font-bold">Progress</p>
            <p className="text-lg font-black">{Math.round(progress)}%</p>
          </div>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#FF8C00]" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            isActive={activeIndex === index}
            isCompleted={completedExercises.includes(exercise.id)}
            onToggleComplete={() => toggleComplete(exercise.id)}
            onSelect={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
