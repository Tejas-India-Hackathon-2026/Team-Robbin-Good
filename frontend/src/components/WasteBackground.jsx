export default function WasteBackground({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Recycling symbol - top left */}
        <svg className="absolute -top-10 -left-10 w-64 h-64 opacity-[0.07] animate-spin-slow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 20 L140 90 H60 Z" stroke="white" strokeWidth="3" fill="none" />
          <path d="M50 160 L100 90 L150 160" stroke="white" strokeWidth="3" fill="none" />
          <path d="M150 160 L100 90" stroke="white" strokeWidth="3" fill="none" />
          <path d="M60 95 L40 130 L80 130 Z" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M140 95 L120 130 L160 130 Z" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M95 25 L105 25 L102 35 L98 35 Z" fill="white" />
        </svg>

        {/* Leaf cluster - top right */}
        <svg className="absolute top-20 right-20 w-40 h-40 opacity-[0.06] animate-float" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10 Q90 40 60 80 Q30 40 60 10Z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M60 10 L60 80" stroke="white" strokeWidth="1.5" />
          <path d="M60 30 Q75 25 85 35" stroke="white" strokeWidth="1" fill="none" />
          <path d="M60 45 Q45 40 35 50" stroke="white" strokeWidth="1" fill="none" />
          <path d="M60 55 Q75 50 82 58" stroke="white" strokeWidth="1" fill="none" />
        </svg>

        {/* Bin icon - bottom left */}
        <svg className="absolute bottom-16 left-16 w-32 h-32 opacity-[0.06] animate-float-delayed" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="30" width="50" height="70" rx="4" stroke="white" strokeWidth="2.5" fill="none" />
          <rect x="20" y="22" width="60" height="12" rx="3" stroke="white" strokeWidth="2.5" fill="none" />
          <line x1="40" y1="45" x2="40" y2="90" stroke="white" strokeWidth="2" />
          <line x1="50" y1="45" x2="50" y2="90" stroke="white" strokeWidth="2" />
          <line x1="60" y1="45" x2="60" y2="90" stroke="white" strokeWidth="2" />
        </svg>

        {/* Circular arrows - right side */}
        <svg className="absolute top-1/2 -right-16 w-48 h-48 opacity-[0.05] animate-spin-slow-reverse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 30 A70 70 0 0 1 160 130" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M155 115 L162 132 L148 132" stroke="white" strokeWidth="2.5" fill="white" />
          <path d="M160 140 A70 70 0 0 1 40 130" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M45 145 L38 128 L52 128" stroke="white" strokeWidth="2.5" fill="white" />
          <path d="M40 120 A70 70 0 0 1 100 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M105 40 L98 25 L92 40" stroke="white" strokeWidth="2.5" fill="white" />
        </svg>

        {/* Earth/globe - center right */}
        <svg className="absolute top-1/3 right-1/4 w-24 h-24 opacity-[0.05] animate-pulse-slow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" />
          <ellipse cx="50" cy="50" rx="20" ry="40" stroke="white" strokeWidth="1.5" fill="none" />
          <ellipse cx="50" cy="50" rx="40" ry="15" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M20 65 Q35 55 50 60 Q65 65 80 55" stroke="white" strokeWidth="1" fill="none" />
        </svg>

        {/* Small leaves scattered */}
        <svg className="absolute bottom-1/3 left-1/4 w-16 h-16 opacity-[0.05] animate-float" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 5 Q40 20 25 40 Q10 20 25 5Z" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M25 5 L25 40" stroke="white" strokeWidth="1" />
        </svg>

        {/* Seedling - bottom right */}
        <svg className="absolute bottom-8 right-1/3 w-20 h-20 opacity-[0.06] animate-float-delayed" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 75 L30 35" stroke="white" strokeWidth="2" />
          <path d="M30 35 Q15 20 10 5 Q25 15 30 35Z" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M30 45 Q45 30 50 15 Q35 30 30 45Z" stroke="white" strokeWidth="1.5" fill="none" />
          <line x1="10" y1="75" x2="50" y2="75" stroke="white" strokeWidth="1.5" />
        </svg>

        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-teal-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  )
}
