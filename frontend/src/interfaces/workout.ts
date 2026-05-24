export interface Exercise {
  id: number;
  name: string;
  media?: {
    url: string;
    mime: string;
  };
  sets: number;
  reps: string;
  duration?: number;
  technique: string;
  tips?: string;
  commonMistakes?: string;
  muscles?: string;
}

export interface Workout {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  calories: number;
  category: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  video?: {
    url: string;
  };
  equipment: string;
  targetMuscleGroups: string;
  frequency: string;
  nutritionAdvice?: {
    preWorkout?: string;
    postWorkout?: string;
    hydration?: string;
  };
  exercises: Exercise[];
  text?: string;
}
