import { useMemo } from "react"

export default function StarBackground() {
  const stars = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    width: Math.random() * 2 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3,
  })), [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)" }}
      />
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: s.width + "px",
              height: s.width + "px",
              top: s.top + "%",
              left: s.left + "%",
              opacity: s.opacity,
              animation: `pulse ${s.duration}s ease-in-out infinite`,
              animationDelay: s.delay + "s",
            }}
          />
        ))}
      </div>
    </div>
  )
}
