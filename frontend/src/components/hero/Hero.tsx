"use client";

import HeroContent from "./HeroContent";
import HeroVisuals from "./HeroVisuals";

export default function Hero() {
  return (
    <section className="relative min-h-[900px] lg:min-h-screen flex items-center overflow-hidden bg-[#1B2B3B] pt-20 lg:pt-0">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF8C00]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#FF8C00]/5 rounded-full blur-[150px]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Side: Content */}
          <div className="w-full lg:w-[55%]">
            <HeroContent />
          </div>

          {/* Right Side: Visuals */}
          <div className="w-full lg:w-[45%]">
            <HeroVisuals />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1B2B3B] to-transparent z-10"></div>
    </section>
  );
}
