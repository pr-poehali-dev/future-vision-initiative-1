import { motion } from "framer-motion"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"

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

        {/* Server subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm tracking-widest uppercase font-semibold mb-6"
          style={{ color: "#c8e6c9" }}
        >
          Sunrise of the Republic
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-center leading-none mb-4"
        >
          <span className="text-white">СВОД</span>
          <br />
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            ПРАВИЛ
          </span>
        </motion.h1>

        {/* Decorative sabers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-4 my-8"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-500" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <LiquidButton
            size="xxl"
            className="font-bold text-lg tracking-widest uppercase bg-yellow-400 text-black hover:bg-yellow-300 border-yellow-400"
            onClick={onEnter}
          >
            Читать Свод Правил
          </LiquidButton>
        </motion.div>

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
