import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { rulesData } from "@/data/rulesData"

interface StarWarsHeroProps {
  onEnter: () => void
  onNavigate: (pageId: string, subpageId?: string) => void
}

// Все пункты верхней навигации (справа → к центру = индекс 0 самый правый)
const topNavIds = ["additional", "formations", "positions", "charter", "__home"]
const topNavLabels: Record<string, string> = {
  additional: "Дополнительно",
  formations:  "Формирования",
  positions:   "Должности",
  charter:     "Основной Устав",
  __home:      "Главная",
}

function toRad(d: number) { return (d * Math.PI) / 180 }
function pt(cx: number, cy: number, r: number, deg: number) {
  return { x: cx + r * Math.cos(toRad(deg)), y: cy + r * Math.sin(toRad(deg)) }
}

// Знак Галактической Республики — точно по оригиналу
// Структура: сплошное внешнее кольцо + 9 сегментов-дуг внутри него + 9 спиц + заполненный центр
function RepublicCrest({ size = 28 }: { size?: number }) {
  const C = "#00cccc"
  const cx = 50, cy = 50
  const rOut = 47    // внешний радиус кольца
  const rRing = 38   // внутренний радиус кольца (граница сегментов снаружи)
  const rSeg = 29    // внутренний радиус сегментов (граница спиц)
  const rHub = 13    // радиус центра
  const N = 9        // количество сегментов/спиц
  const gapDeg = 9   // зазор между сегментами в градусах
  const ringW = rOut - rRing  // толщина кольца

  const segAngle = 360 / N

  // 9 сегментов — заполненные дуги между rRing и rSeg
  const segments = Array.from({ length: N }).map((_, i) => {
    const s = i * segAngle - 90 + gapDeg / 2
    const e = (i + 1) * segAngle - 90 - gapDeg / 2
    const p1 = pt(cx, cy, rRing, s)
    const p2 = pt(cx, cy, rRing, e)
    const p3 = pt(cx, cy, rSeg, e)
    const p4 = pt(cx, cy, rSeg, s)
    return (
      <path
        key={i}
        d={`M ${p1.x} ${p1.y} A ${rRing} ${rRing} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rSeg} ${rSeg} 0 0 0 ${p4.x} ${p4.y} Z`}
        fill={C}
      />
    )
  })

  // 9 спиц — от центра до rSeg, с зазором у хаба
  const spokes = Array.from({ length: N }).map((_, i) => {
    const deg = i * segAngle - 90
    const p1 = pt(cx, cy, rHub + 1, deg)
    const p2 = pt(cx, cy, rSeg, deg)
    return (
      <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C} strokeWidth={5} strokeLinecap="butt" />
    )
  })

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Сплошное внешнее кольцо */}
      <circle cx={cx} cy={cy} r={rOut - ringW / 2} stroke={C} strokeWidth={ringW} fill="none" />
      {/* Сегменты */}
      {segments}
      {/* Спицы */}
      {spokes}
      {/* Центральный заполненный круг */}
      <circle cx={cx} cy={cy} r={rHub} fill={C} />
    </svg>
  )
}


export default function StarWarsHero({ onEnter, onNavigate }: StarWarsHeroProps) {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [hoveredSub, setHoveredSub] = useState<string | null>(null)
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

      {/* Top-right navigation */}
      <div className="fixed top-0 right-0 z-30 flex items-start pointer-events-none">
        <div className="flex items-start pointer-events-auto">
          {/* Порядок: Главная левее всех, Дополнительно — крайний правый */}
          {[...topNavIds].reverse().map((id, i) => {
            const label = topNavLabels[id]
            const page = rulesData.find(p => p.id === id)
            const subpages = page?.subpages ?? []
            const isHovered = hoveredNav === id

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                className="relative"
                onMouseEnter={() => setHoveredNav(id)}
                onMouseLeave={() => { setHoveredNav(null); setHoveredSub(null) }}
              >
                {/* Nav button */}
                <button
                  onClick={() => id === "__home" ? window.scrollTo({ top: 0 }) : onNavigate(id)}
                  className="relative flex flex-col items-center px-4 pt-4 pb-2"
                >
                  <span
                    className="text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-200"
                    style={{ color: isHovered ? "#00cccc" : "#00cccc88" }}
                  >
                    {label}
                  </span>
                  <span
                    className="block mt-1.5 rounded-sm transition-all duration-300"
                    style={{
                      height: "2px",
                      backgroundColor: "#00cccc",
                      width: isHovered ? "100%" : "24px",
                      boxShadow: isHovered ? "0 0 8px #00cccc88" : "none",
                    }}
                  />
                </button>

                {/* Dropdown — открывается вниз, прибит к правому краю если крайний */}
                <AnimatePresence>
                  {isHovered && subpages.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 min-w-max"
                      style={{ background: "rgba(4,8,18,0.98)", border: "1px solid #00cccc22", borderRadius: "6px" }}
                    >
                      {subpages.map((sub) => {
                        const hasSubs = sub.subpages && sub.subpages.length > 0
                        const isSubHovered = hoveredSub === sub.id
                        return (
                          <div
                            key={sub.id}
                            className="relative"
                            onMouseEnter={() => setHoveredSub(sub.id)}
                            onMouseLeave={() => setHoveredSub(null)}
                          >
                            <button
                              onClick={() => onNavigate(id, sub.id)}
                              className="w-full text-left flex items-center justify-between gap-6 px-5 py-2.5 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-150"
                              style={{ color: isSubHovered ? "#00cccc" : "#00cccc77" }}
                            >
                              {sub.title}
                              {hasSubs && <span style={{ color: "#00cccc44" }}>▸</span>}
                            </button>
                            <AnimatePresence>
                              {hasSubs && isSubHovered && (
                                <motion.div
                                  initial={{ opacity: 0, x: 6 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 6 }}
                                  transition={{ duration: 0.12 }}
                                  className="absolute right-full top-0 min-w-max"
                                  style={{ background: "rgba(4,8,18,0.98)", border: "1px solid #00cccc22", borderRadius: "6px" }}
                                >
                                  {sub.subpages!.map((ssub) => (
                                    <button
                                      key={ssub.id}
                                      onClick={() => onNavigate(id, ssub.id)}
                                      className="w-full text-left px-5 py-2.5 text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-150"
                                      style={{ color: "#00cccc77" }}
                                      onMouseEnter={e => (e.currentTarget.style.color = "#00cccc")}
                                      onMouseLeave={e => (e.currentTarget.style.color = "#00cccc77")}
                                    >
                                      {ssub.title}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6" style={{ marginTop: "-160px" }}>

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

        {/* Social buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col items-center gap-4 mt-14 w-full max-w-xs"
        >
          <p className="text-2xl md:text-3xl font-black tracking-widest uppercase mb-2 text-white">
            Дополнительные Ссылки
          </p>

          {[
            {
              label: "ВКонтакте",
              href: "https://vk.com/sunrisesswrp",
              bg: "#4680C2",
              icon: (
                <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z" />
                </svg>
              ),
            },
            {
              label: "Telegram",
              href: "https://t.me/starwarssunriserp",
              bg: "#229ED9",
              icon: (
                <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              ),
            },
            {
              label: "Discord",
              href: "https://discord.gg/4ZWWpDBrDr",
              bg: "#5865F2",
              icon: (
                <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.132 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              ),
            },
            {
              label: "Правила Сервера",
              href: "https://docs.google.com/document/d/1yg1ZYRrvO8SiJD59QdS5uV46V--3spnN-LqGUUmwQXA/edit?tab=t.0",
              bg: "#00cccc",
              icon: (
                <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              ),
            },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => window.open(btn.href, "_blank")}
              className="w-full flex items-center gap-4 px-7 py-4 rounded-xl font-bold text-base tracking-wide text-white transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: btn.bg }}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </motion.div>

      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 z-10">
        <p className="text-center text-xs tracking-wide max-w-lg text-slate-50">
          Данная информация, предоставленная на сайте, является собственностью Sunrise Team. Копирование любых данных строго запрещено.
        </p>
      </div>
    </div>
  )
}