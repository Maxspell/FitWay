import React, { useState } from 'react';
import { Calculator, Scale, Apple } from 'lucide-react';

const Tools = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  
  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInM = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmiValue = weightInKg / (heightInM * heightInM);
    setBmi(Math.round(bmiValue * 10) / 10);
  };

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic BMR calculation using Mifflin-St Jeor Equation
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * 25 + 5; // Assuming age 25 and male
    setCalories(Math.round(bmr * 1.2)); // Sedentary lifestyle multiplier
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-12">Fitness Calculators</h1>
        
        <div className="grid grid-cols-2 gap-8">
          {/* BMI Calculator */}
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Scale className="h-8 w-8 text-[#FF8C00]" />
              <h2 className="text-2xl font-bold">BMI Calculator</h2>
            </div>
            
            <form onSubmit={calculateBMI} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Calculate BMI
              </button>
            </form>
            
            {bmi !== null && (
              <div className="mt-6 p-4 bg-[#1B2B3B] rounded-lg">
                <p className="text-center">
                  Your BMI is: <span className="text-2xl font-bold text-[#FF8C00]">{bmi}</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Calorie Calculator */}
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <Apple className="h-8 w-8 text-[#FF8C00]" />
              <h2 className="text-2xl font-bold">Calorie Calculator</h2>
            </div>
            
            <form onSubmit={calculateCalories} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-[#1B2B3B] text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF8C00] focus:outline-none"
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Calculate Daily Calories
              </button>
            </form>
            
            {calories !== null && (
              <div className="mt-6 p-4 bg-[#1B2B3B] rounded-lg">
                <p className="text-center">
                  Recommended daily calories: <span className="text-2xl font-bold text-[#FF8C00]">{calories}</span>
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Tools Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More Fitness Tools</h2>
          <div className="grid grid-cols-3 gap-4">
            {['Workout Planner', 'Progress Tracker', 'Meal Generator'].map(tool => (
              <button key={tool} className="card hover:bg-[#2d4258] transition-colors">
                <Calculator className="h-8 w-8 text-[#FF8C00] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-center">{tool}</h3>
                <p className="text-gray-300 text-center mt-2">Coming Soon</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;