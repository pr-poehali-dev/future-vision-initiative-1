import { motion } from "framer-motion"

interface StarWarsHeroProps {
  onEnter: () => void
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-px w-32 mb-8"
          style={{ backgroundColor: "#c8e6c9" }}
        />

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-widest text-center leading-none"
          style={{ color: "#00cccc" }}
        >
          SUNRISE OF THE REPUBLIC
        </motion.h1>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="h-px w-32 mt-16"
          style={{ backgroundColor: "#c8e6c9" }}
        />
      </div>
    </div>
  )
}