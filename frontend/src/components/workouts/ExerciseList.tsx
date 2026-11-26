"use client";

import { useState, useRef, useEffect } from "react";
import { Exercise } from "@/interfaces/workout";
import ExerciseCard from "./ExerciseCard";
import { motion, AnimatePresence } from "framer-motion";
import { Timer } from "lucide-react";

interface Props {
  exercises?: Exercise[];
}

export default function ExerciseList({ exercises }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [restTimer, setRestTimer] = useState<{ active: boolean; seconds: number }>({ active: false, seconds: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearRestInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearRestInterval();
    };
  }, []);

  const startRest = (seconds: number = 60) => {
    clearRestInterval();
    setRestTimer({ active: true, seconds });
    intervalRef.current = setInterval(() => {
      setRestTimer((prev) => {
        if (prev.seconds <= 1) {
          clearRestInterval();
          return { active: false, seconds: 0 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
  };

  const skipRest = () => {
    clearRestInterval();
    setRestTimer({ active: false, seconds: 0 });
  };

  const toggleComplete = (id: number) => {
    const wasCompleted = completedExercises.includes(id);
    setCompletedExercises((prev) =>
      wasCompleted ? prev.filter((i) => i !== id) : [...prev, id]
    );

    if (!wasCompleted) {
      startRest(60); // Start 60s rest after completing an exercise
    }
  };

  const progress = exercises?.length
    ? (completedExercises.length / exercises.length) * 100
    : 0;

  return (
    <div id="exercise-list" className="space-y-6 relative scroll-mt-24">
      {!exercises ? (
        <div className="text-center py-12 bg-[#243447] rounded-2xl border border-white/5">
          <p className="text-gray-400">No exercises found for this workout.</p>
        </div>
      ) : (
        <>
          {/* Floating Rest Timer */}
          <div className="fixed bottom-20 sm:bottom-8 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
            <AnimatePresence>
              {restTimer.active && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="pointer-events-auto w-full max-w-xs sm:w-auto sm:max-w-none bg-[#C25700] text-white px-5 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-between sm:justify-center gap-4 border-2 sm:border-4 border-white/20 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 font-bold text-base sm:text-lg">
                    <Timer className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse shrink-0" />
                    <span>Rest: {restTimer.seconds}s</span>
                  </div>
                  <button
                    type="button"
                    onClick={skipRest}
                    className="bg-[#1B2B3B]/80 hover:bg-[#1B2B3B] text-white px-3 py-1.5 rounded-full transition-colors text-xs font-bold shrink-0"
                  >
                    Skip
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Exercise List <span className="text-[#FF8C00] ml-2">({exercises.length})</span>
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-400 uppercase font-bold">Progress</p>
                <p className="text-lg font-black">{Math.round(progress)}%</p>
              </div>
              <div className="w-24 sm:w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
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
              <div key={exercise.id} id={index === 0 ? "first-exercise" : undefined} className="scroll-mt-28">
                <ExerciseCard
                  exercise={exercise}
                  index={index}
                  isActive={activeIndex === index}
                  isCompleted={completedExercises.includes(exercise.id)}
                  onToggleComplete={() => toggleComplete(exercise.id)}
                  onSelect={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
