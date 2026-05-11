import type { Schema, Struct } from '@strapi/strapi';

export interface FitnessExercise extends Struct.ComponentSchema {
  collectionName: 'components_fitness_exercises';
  info: {
    description: '';
    displayName: 'Exercise';
    icon: 'bulletList';
  };
  attributes: {
    commonMistakes: Schema.Attribute.Text;
    duration: Schema.Attribute.Integer;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    muscles: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    reps: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'12'>;
    sets: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<3>;
    technique: Schema.Attribute.Text & Schema.Attribute.Required;
    tips: Schema.Attribute.Text;
  };
}

export interface FitnessNutritionTips extends Struct.ComponentSchema {
  collectionName: 'components_fitness_nutrition_tips';
  info: {
    displayName: 'Nutrition Tips';
    icon: 'restaurant';
  };
  attributes: {
    hydration: Schema.Attribute.Text;
    postWorkout: Schema.Attribute.Text;
    preWorkout: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'fitness.exercise': FitnessExercise;
      'fitness.nutrition-tips': FitnessNutritionTips;
    }
  }
}
