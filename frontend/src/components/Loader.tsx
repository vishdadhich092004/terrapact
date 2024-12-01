const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-transparent overflow-hidden">
      <div className="relative w-48 h-48">
        {/* Main Circular Loader */}
        <div className="absolute inset-0 animate-spin">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient
                id="loaderGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#512601" stopOpacity="1" />
                <stop offset="100%" stopColor="#a24c02" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#loaderGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="280"
              strokeDashoffset="200"
            />
          </svg>
        </div>

        {/* Subtle Background Pulse */}
        <div
          className="absolute inset-[-10px] rounded-full opacity-30 animate-ping"
          style={{
            background: `radial-gradient(circle at 30% 30%, #a24c02, #512601)`,
            animationDuration: "2.5s",
          }}
        />

        {/* Central Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `linear-gradient(135deg, #fec89a, #a24c02)`,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>

      {/* Global Styles */}
    </div>
  );
};

export default Loader;
