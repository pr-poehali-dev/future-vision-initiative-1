import { motion } from "framer-motion"

interface StarWarsHeroProps {
  onEnter: () => void
}

// Знак Галактической Республики (точный символ)
function RepublicCrest({ size = 28 }: { size?: number }) {
  const C = "#00cccc"
  // Параметры
  const cx = 50, cy = 50
  const rOuter = 47   // внешнее кольцо
  const rInner = 34   // внутреннее кольцо (граница сегментов)
  const rHub = 12     // центральная втулка
  const spokeW = 6    // ширина спицы (strokeWidth)
  const segCount = 9  // количество сегментов во внешнем кольце
  const segGap = 14   // угол зазора между сегментами в градусах

  // Сегменты внешнего кольца: 9 штук с зазорами
  const segAngle = 360 / segCount
  const segments = Array.from({ length: segCount }).map((_, i) => {
    const startDeg = i * segAngle + segGap / 2 - 90
    const endDeg = (i + 1) * segAngle - segGap / 2 - 90
    const startRad = (startDeg * Math.PI) / 180
    const endRad = (endDeg * Math.PI) / 180
    const rMid = (rOuter + rInner) / 2
    const thickness = (rOuter - rInner) / 2
    return (
      <path
        key={i}
        d={describeArc(cx, cy, rMid, startDeg, endDeg)}
        stroke={C}
        strokeWidth={thickness * 2}
        fill="none"
        strokeLinecap="butt"
      />
    )
  })

  // 9 спиц от втулки до внутреннего кольца
  const spokes = Array.from({ length: segCount }).map((_, i) => {
    const angleDeg = i * segAngle - 90
    const rad = (angleDeg * Math.PI) / 180
    const x1 = cx + rHub * Math.cos(rad)
    const y1 = cy + rHub * Math.sin(rad)
    const x2 = cx + rInner * Math.cos(rad)
    const y2 = cy + rInner * Math.sin(rad)
    return (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C} strokeWidth={spokeW} strokeLinecap="round" />
    )
  })

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={rOuter} stroke={C} strokeWidth="3" fill="none" />
      {/* Inner circle */}
      <circle cx={cx} cy={cy} r={rInner} stroke={C} strokeWidth="2" fill="none" />
      {/* Segments */}
      {segments}
      {/* Spokes */}
      {spokes}
      {/* Center hub */}
      <circle cx={cx} cy={cy} r={rHub} fill={C} />
    </svg>
  )
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180
  const x1 = cx + r * Math.cos(toRad(startDeg))
  const y1 = cy + r * Math.sin(toRad(startDeg))
  const x2 = cx + r * Math.cos(toRad(endDeg))
  const y2 = cy + r * Math.sin(toRad(endDeg))
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
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