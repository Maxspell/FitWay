import React, { useState } from 'react';
import { Filter, Play, Clock, Dumbbell, Target, User } from 'lucide-react';

const Workouts = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const workouts = [
    {
      id: 1,
      title: 'Full Body HIIT',
      category: 'weight-loss',
      duration: '45 min',
      difficulty: 'Intermediate',
      target: 'Fat Loss',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      trainer: 'Alex Rivers'
    },
    {
      id: 2,
      title: 'Strength Builder',
      category: 'muscle-gain',
      duration: '60 min',
      difficulty: 'Advanced',
      target: 'Muscle Gain',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      trainer: 'Mike Chen'
    },
    {
      id: 3,
      title: 'Core Crusher',
      category: 'toning',
      duration: '30 min',
      difficulty: 'Beginner',
      target: 'Core Strength',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      trainer: 'Sarah Johnson'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Workouts' },
    { id: 'weight-loss', label: 'Weight Loss' },
    { id: 'muscle-gain', label: 'Muscle Gain' },
    { id: 'toning', label: 'Toning' }
  ];

  const filteredWorkouts = selectedFilter === 'all' 
    ? workouts 
    : workouts.filter(w => w.category === selectedFilter);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="section-title">Workout Library</h1>
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-[#FF8C00]" />
            <div className="flex gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-[#FF8C00] text-white'
                      : 'bg-[#243447] text-gray-300 hover:bg-[#2d4258]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {filteredWorkouts.map(workout => (
            <div key={workout.id} className="card group hover:bg-[#2d4258] transition-all">
              <div className="relative mb-4">
                <img 
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-16 w-16 text-white" />
                </button>
              </div>
              <h3 className="text-xl font-bold mb-4">{workout.title}</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#FF8C00]" />
                  {workout.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-[#FF8C00]" />
                  {workout.difficulty}
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#FF8C00]" />
                  {workout.target}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#FF8C00]" />
                  {workout.trainer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;