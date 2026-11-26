"use client";

import { Exercise } from "@/interfaces/workout";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, HelpCircle, AlertCircle, ListChecks } from "lucide-react";
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
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
        isActive 
          ? "bg-[#2d4258] border-[#FF8C00] shadow-lg shadow-[#FF8C00]/5" 
          : "bg-[#243447] border-white/5 hover:border-white/20"
      } ${isCompleted ? "opacity-85" : ""}`}
    >
      <div className="p-4 md:p-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete();
          }}
          aria-label={isCompleted ? `Mark ${exercise.name} as incomplete` : `Mark ${exercise.name} as complete`}
          aria-pressed={isCompleted}
          className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-black text-sm border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] ${
            isCompleted 
              ? "bg-green-600 border-green-500 text-white" 
              : isActive 
                ? "border-[#FF8C00] text-[#FF8C00]" 
                : "border-gray-500 text-gray-300 hover:border-gray-400"
          }`}
        >
          {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
        </button>

        <button
          type="button"
          onClick={onSelect}
          aria-expanded={isActive}
          className="flex-1 flex items-center justify-between gap-3 text-left min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8C00] rounded-lg"
        >
          <div className="min-w-0">
            <h3 className={`text-base sm:text-lg font-bold leading-tight ${isCompleted ? "line-through text-gray-400" : "text-white"}`}>
              {exercise.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-bold">
              {exercise.sets} Sets • {exercise.reps} {exercise.duration ? `• ${exercise.duration}s` : ""}
            </p>
          </div>

          <ChevronDown className={`w-6 h-6 text-gray-400 shrink-0 transition-transform ${isActive ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 md:px-6 pb-4 md:pb-6 pt-3 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Media/Visuals */}
                <div className="relative aspect-video rounded-xl bg-black/40 overflow-hidden group">
                  {exercise.media ? (
                    (() => {
                      const mediaUrl = getStrapiMedia(exercise.media.url);
                      const mime = exercise.media.mime || "";
                      const isVideo =
                        mime.startsWith("video/") ||
                        /\.(webm|mp4|mov|ogg)$/i.test(exercise.media.url);

                      if (isVideo) {
                        return (
                          <video
                            src={mediaUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        );
                      }

                      return (
                        <Image
                          src={mediaUrl}
                          alt={exercise.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                          className="object-cover"
                        />
                      );
                    })()
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <p className="text-gray-400 italic text-sm">No animation available</p>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 p-2 bg-black/60 rounded-lg backdrop-blur-md pointer-events-none">
                    <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Form Preview</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5 sm:mb-3 text-[#FF8C00]">
                      <ListChecks className="w-4 h-4 shrink-0" />
                      <h4 className="text-xs font-black uppercase tracking-widest">Execution Technique</h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                      &ldquo;{exercise.technique}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-blue-400">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest">Pro Tips</h5>
                      </div>
                      <p className="text-xs text-gray-300 leading-snug">
                        {exercise.tips || "Keep a steady pace throughout the set."}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-red-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest">Avoid</h5>
                      </div>
                      <p className="text-xs text-gray-300 leading-snug">
                        {exercise.commonMistakes || "Don't rush the eccentric phase."}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                     <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                       Primary Muscles: <span className="text-gray-200">{exercise.muscles || "N/A"}</span>
                     </div>
                     <button 
                       type="button"
                       onClick={(e) => {
                         e.stopPropagation();
                         onToggleComplete();
                       }}
                       className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto ${
                         isCompleted 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-[#C25700] text-white hover:bg-[#A34600]"
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
