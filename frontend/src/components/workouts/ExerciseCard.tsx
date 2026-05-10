"use client";

import { Exercise } from "@/interfaces/workout";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Circle, HelpCircle, AlertCircle, ListChecks } from "lucide-react";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

interface Props {
  exercise: Exercise;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onSelect: () => void;
}

export default function ExerciseCard({ 
  exercise, 
  index, 
  isActive, 
  isCompleted, 
  onToggleComplete, 
  onSelect 
}: Props) {
  return (
    <motion.div 
      layout
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive 
          ? "bg-[#2d4258] border-[#FF8C00] shadow-lg shadow-[#FF8C00]/5" 
          : "bg-[#243447] border-white/5 hover:border-white/20"
      } ${isCompleted ? "opacity-80" : ""}`}
    >
      <div 
        className="p-4 md:p-6 cursor-pointer flex items-center justify-between"
        onClick={onSelect}
      >
        <div className="flex items-center gap-4">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${
              isCompleted 
                ? "bg-green-500 border-green-500 text-white" 
                : isActive 
                  ? "border-[#FF8C00] text-[#FF8C00]" 
                  : "border-gray-600 text-gray-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
          >
            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
          </div>
          <div>
            <h3 className={`text-lg font-bold leading-tight ${isCompleted ? "line-through text-gray-500" : ""}`}>
              {exercise.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">
              {exercise.sets} Sets • {exercise.reps} {exercise.duration ? `• ${exercise.duration}s` : ""}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ChevronDown className={`w-6 h-6 text-gray-500 transition-transform ${isActive ? "rotate-180" : ""}`} />
        </div>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Media/Visuals */}
                <div className="relative aspect-video rounded-xl bg-black/40 overflow-hidden group">
                  {exercise.media ? (
                    <Image
                      src={getStrapiMedia(exercise.media.url)}
                      alt={exercise.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <p className="text-gray-500 italic">No animation available</p>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 p-2 bg-black/60 rounded-lg backdrop-blur-md">
                    <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Form Preview</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-[#FF8C00]">
                      <ListChecks className="w-4 h-4" />
                      <h4 className="text-xs font-black uppercase tracking-widest">Execution Technique</h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                      "{exercise.technique}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest">Pro Tips</h5>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-tight">
                        {exercise.tips || "Keep a steady pace throughout the set."}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-red-400">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest">Avoid</h5>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-tight">
                        {exercise.commonMistakes || "Don't rush the eccentric phase."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                     <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                       Primary Muscles: <span className="text-gray-300">{exercise.muscles || "N/A"}</span>
                     </div>
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         onToggleComplete();
                       }}
                       className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                         isCompleted 
                          ? "bg-green-500/20 text-green-500" 
                          : "bg-[#FF8C00] text-white hover:bg-[#E67E00]"
                       }`}
                     >
                       {isCompleted ? "Completed" : "Mark as Done"}
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
