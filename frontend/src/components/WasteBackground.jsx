export default function WasteBackground({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Green dustbin - top left */}
        <svg className="absolute top-10 left-10 w-36 h-44 opacity-[0.08] animate-float" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="40" width="70" height="85" rx="5" stroke="white" strokeWidth="2.5" />
          <rect x="18" y="28" width="84" height="16" rx="4" stroke="white" strokeWidth="2.5" />
          <rect x="42" y="16" width="36" height="14" rx="7" stroke="white" strokeWidth="2" />
          <line x1="50" y1="55" x2="50" y2="115" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="60" y1="55" x2="60" y2="115" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="70" y1="55" x2="70" y2="115" stroke="white" strokeWidth="2" opacity="0.6" />
          <text x="60" y="85" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" opacity="0.5">WET</text>
        </svg>

        {/* Blue dustbin - top right */}
        <svg className="absolute top-16 right-14 w-32 h-40 opacity-[0.07] animate-float-delayed" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="40" width="70" height="85" rx="5" stroke="white" strokeWidth="2.5" />
          <rect x="18" y="28" width="84" height="16" rx="4" stroke="white" strokeWidth="2.5" />
          <rect x="42" y="16" width="36" height="14" rx="7" stroke="white" strokeWidth="2" />
          <path d="M42 65 L55 80 L78 58" stroke="white" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
          <path d="M42 85 L55 75 L78 92" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
          <text x="60" y="108" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" opacity="0.5">DRY</text>
        </svg>

        {/* Plastic bottle - center left */}
        <svg className="absolute top-1/3 -left-4 w-20 h-48 opacity-[0.06] animate-float" viewBox="0 0 60 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="5" width="16" height="12" rx="3" stroke="white" strokeWidth="2" />
          <path d="M22 17 Q15 30 15 45 L15 140 Q15 150 30 150 Q45 150 45 140 L45 45 Q45 30 38 17" stroke="white" strokeWidth="2" />
          <line x1="18" y1="55" x2="42" y2="55" stroke="white" strokeWidth="1" opacity="0.4" />
          <line x1="18" y1="70" x2="42" y2="70" stroke="white" strokeWidth="1" opacity="0.4" />
          <line x1="18" y1="85" x2="42" y2="85" stroke="white" strokeWidth="1" opacity="0.4" />
          <ellipse cx="30" cy="105" rx="10" ry="14" stroke="white" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Crumpled paper ball - top center */}
        <svg className="absolute top-8 left-1/3 w-20 h-20 opacity-[0.06] animate-pulse-slow" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="42" r="25" stroke="white" strokeWidth="1.5" />
          <path d="M22 35 Q30 25 40 30 Q50 22 55 35" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path d="M20 45 Q35 50 45 40 Q55 48 60 42" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M30 55 Q40 48 50 55" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M35 25 L38 15" stroke="white" strokeWidth="1.5" opacity="0.4" />
          <path d="M45 28 L50 18" stroke="white" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Apple core / food waste - right side */}
        <svg className="absolute top-1/2 right-8 w-16 h-24 opacity-[0.06] animate-float-delayed" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 12 L25 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M25 8 Q32 3 35 8" stroke="white" strokeWidth="1" opacity="0.5" />
          <path d="M15 20 Q12 35 15 55 Q18 65 25 68 Q32 65 35 55 Q38 35 35 20 Q30 12 25 15 Q20 12 15 20Z" stroke="white" strokeWidth="1.8" />
          <path d="M18 35 Q25 30 32 35" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M17 48 Q25 44 33 48" stroke="white" strokeWidth="1" opacity="0.3" />
        </svg>

        {/* Red dustbin (hazardous) - bottom right */}
        <svg className="absolute bottom-20 right-20 w-28 h-36 opacity-[0.07] animate-float" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="40" width="70" height="85" rx="5" stroke="white" strokeWidth="2.5" />
          <rect x="18" y="28" width="84" height="16" rx="4" stroke="white" strokeWidth="2.5" />
          <rect x="42" y="16" width="36" height="14" rx="7" stroke="white" strokeWidth="2" />
          <path d="M52 60 L68 60 L64 75 L56 75 Z" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <line x1="60" y1="78" x2="60" y2="100" stroke="white" strokeWidth="2" opacity="0.5" />
          <line x1="55" y1="95" x2="65" y2="95" stroke="white" strokeWidth="2" opacity="0.5" />
          <text x="60" y="115" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" opacity="0.5">HAZARD</text>
        </svg>

        {/* E-waste circuit board - bottom left */}
        <svg className="absolute bottom-10 left-1/4 w-28 h-20 opacity-[0.06] animate-pulse-slow" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="100" height="60" rx="4" stroke="white" strokeWidth="2" />
          <rect x="35" y="25" width="20" height="20" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <rect x="65" y="30" width="12" height="12" stroke="white" strokeWidth="1" opacity="0.4" />
          <circle cx="25" cy="45" r="4" stroke="white" strokeWidth="1" opacity="0.4" />
          <line x1="55" y1="35" x2="65" y2="35" stroke="white" strokeWidth="1" opacity="0.3" />
          <line x1="55" y1="42" x2="65" y2="42" stroke="white" strokeWidth="1" opacity="0.3" />
          <line x1="77" y1="30" x2="95" y2="20" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="77" y1="36" x2="95" y2="40" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="35" y1="25" x2="20" y2="15" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="35" y1="35" x2="20" y2="45" stroke="white" strokeWidth="0.8" opacity="0.3" />
        </svg>

        {/* Collection truck - center */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-28 opacity-[0.04] animate-truck" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="25" width="100" height="55" rx="3" stroke="white" strokeWidth="2.5" />
          <rect x="5" y="15" width="100" height="15" rx="2" stroke="white" strokeWidth="2" />
          <path d="M105 40 L105 80 L170 80 L170 45 L145 40 Z" stroke="white" strokeWidth="2.5" />
          <rect x="115" y="50" width="25" height="20" rx="2" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <path d="M145 40 L160 35 L170 45" stroke="white" strokeWidth="1.5" opacity="0.4" />
          <circle cx="40" cy="88" r="10" stroke="white" strokeWidth="2" />
          <circle cx="40" cy="88" r="4" stroke="white" strokeWidth="1.5" />
          <circle cx="145" cy="88" r="10" stroke="white" strokeWidth="2" />
          <circle cx="145" cy="88" r="4" stroke="white" strokeWidth="1.5" />
          <path d="M15 40 L25 35 L35 40 L35 55 L15 55 Z" stroke="white" strokeWidth="1" opacity="0.3" />
          <line x1="50" y1="45" x2="50" y2="65" stroke="white" strokeWidth="1" opacity="0.25" />
          <line x1="65" y1="45" x2="65" y2="65" stroke="white" strokeWidth="1" opacity="0.25" />
          <line x1="80" y1="45" x2="80" y2="65" stroke="white" strokeWidth="1" opacity="0.25" />
        </svg>

        {/* Compost pile - bottom center */}
        <svg className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-24 opacity-[0.06] animate-float-delayed" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 70 Q30 30 50 45 Q70 15 90 40 Q110 20 130 45 Q150 35 150 70" stroke="white" strokeWidth="2" />
          <path d="M40 50 Q45 42 50 50" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M70 40 Q75 32 80 40" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M100 45 Q105 37 110 45" stroke="white" strokeWidth="1" opacity="0.4" />
          <path d="M25 60 Q27 55 30 60" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <path d="M85 55 Q88 50 90 55" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <path d="M120 55 Q122 50 125 55" stroke="white" strokeWidth="0.8" opacity="0.3" />
          {/* Wavy heat lines */}
          <path d="M55 20 Q58 12 61 20" stroke="white" strokeWidth="0.8" opacity="0.25" />
          <path d="M75 15 Q78 8 81 15" stroke="white" strokeWidth="0.8" opacity="0.2" />
          <path d="M95 22 Q98 14 101 22" stroke="white" strokeWidth="0.8" opacity="0.2" />
        </svg>

        {/* Recycle arrows - large center-right */}
        <svg className="absolute top-20 right-1/4 w-36 h-36 opacity-[0.05] animate-spin-slow" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 15 L75 42 H45 Z" stroke="white" strokeWidth="2.5" />
          <path d="M35 85 L60 42 L85 85" stroke="white" strokeWidth="2.5" />
          <path d="M35 85 L50 65 H70 L85 85" stroke="white" strokeWidth="2" />
          <path d="M25 55 L45 65 L35 85" stroke="white" strokeWidth="2" />
          <path d="M95 55 L75 65 L85 85" stroke="white" strokeWidth="2" />
          <polygon points="60,10 65,22 55,22" fill="white" opacity="0.5" />
          <polygon points="30,82 22,78 25,88" fill="white" opacity="0.5" />
          <polygon points="90,82 98,78 95,88" fill="white" opacity="0.5" />
        </svg>

        {/* Glass bottle - left side */}
        <svg className="absolute bottom-1/3 -left-2 w-12 h-32 opacity-[0.05] animate-float-delayed" viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14" y="5" width="12" height="15" rx="2" stroke="white" strokeWidth="1.5" />
          <path d="M14 20 Q8 35 8 50 L8 105 Q8 112 20 112 Q32 112 32 105 L32 50 Q32 35 26 20" stroke="white" strokeWidth="1.5" />
          <line x1="10" y1="60" x2="30" y2="60" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="10" y1="75" x2="30" y2="75" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="20" cy="90" rx="7" ry="10" stroke="white" strokeWidth="0.8" opacity="0.25" />
        </svg>

        {/* Newspaper - right bottom */}
        <svg className="absolute bottom-32 right-1/3 w-24 h-20 opacity-[0.05] animate-pulse-slow" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="5" width="84" height="70" rx="2" stroke="white" strokeWidth="1.8" />
          <rect x="14" y="10" width="35" height="12" stroke="white" strokeWidth="1" opacity="0.4" />
          <line x1="14" y1="30" x2="86" y2="30" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="14" y1="38" x2="86" y2="38" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="14" y1="46" x2="60" y2="46" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="14" y1="54" x2="86" y2="54" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="14" y1="62" x2="70" y2="62" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <rect x="55" y="10" width="31" height="14" rx="1" stroke="white" strokeWidth="0.8" opacity="0.3" />
        </svg>

        {/* Can / tin - top center-right */}
        <svg className="absolute top-4 right-1/3 w-12 h-20 opacity-[0.05] animate-float" viewBox="0 0 50 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="12" rx="15" ry="5" stroke="white" strokeWidth="1.5" />
          <rect x="10" y="12" width="30" height="60" rx="1" stroke="white" strokeWidth="1.5" />
          <ellipse cx="25" cy="72" rx="15" ry="5" stroke="white" strokeWidth="1.5" />
          <line x1="12" y1="30" x2="38" y2="30" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <line x1="12" y1="50" x2="38" y2="50" stroke="white" strokeWidth="0.8" opacity="0.3" />
        </svg>

        {/* Gradient orbs for depth */}
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
