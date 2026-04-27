import { motion } from "framer-motion"

interface StarWarsHeroProps {
  onEnter: () => void
}

// Знак Республики (Galactic Republic crest) в SVG
function RepublicCrest({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke="#00cccc" strokeWidth="4" fill="none" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="32" stroke="#00cccc" strokeWidth="2.5" fill="none" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="7" fill="#00cccc" />
      {/* 8 spokes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 32 * Math.cos(rad)
        const y1 = 50 + 32 * Math.sin(rad)
        const x2 = 50 + 46 * Math.cos(rad)
        const y2 = 50 + 46 * Math.sin(rad)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#00cccc"
            strokeWidth="3"
          />
        )
      })}
      {/* 8 inner spokes to center */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8 + 22.5
        const rad = (angle * Math.PI) / 180
        const x1 = 50 + 7 * Math.cos(rad)
        const y1 = 50 + 7 * Math.sin(rad)
        const x2 = 50 + 28 * Math.cos(rad)
        const y2 = 50 + 28 * Math.sin(rad)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#00cccc"
            strokeWidth="2"
            opacity="0.6"
          />
        )
      })}
    </svg>
  )
}

export default function StarWarsHero({ onEnter }: StarWarsHeroProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Star field background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.7 + 0.1,
                animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 3 + "s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6" style={{ marginTop: "-80px" }}>

        {/* Top decorative line with crest */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center gap-4 mb-10 w-full max-w-2xl"
        >
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #00cccc88)" }} />
          <RepublicCrest size={32} />
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #00cccc88)" }} />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-widest text-center leading-tight"
          style={{ color: "#00cccc" }}
        >
          SUNRISE OF THE REPUBLIC
        </motion.h1>

        {/* Bottom decorative line with crest */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-4 mt-10 w-full max-w-2xl"
        >
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #00cccc88)" }} />
          <RepublicCrest size={32} />
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #00cccc88)" }} />
        </motion.div>

      </div>
    </div>
  )
}
