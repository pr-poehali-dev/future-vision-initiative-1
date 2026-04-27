import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import StarWarsHero from "@/components/StarWarsHero"
import StarBackground from "@/components/StarBackground"
import { rulesData } from "@/data/rulesData"

const topNavIds = ["additional", "formations", "positions", "charter", "__home"]
const topNavLabels: Record<string, string> = {
  additional: "Дополнительно",
  formations:  "Формирования",
  positions:   "Должности",
  charter:     "Основной Устав",
  __home:      "Главная",
}

export default function Index() {
  const [activePage, setActivePage] = useState<string | null>(null)
  const [activeSubpage, setActiveSubpage] = useState<string | null>(null)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [hoveredSub, setHoveredSub] = useState<string | null>(null)

  const handleNavigate = (pageId: string, subpageId?: string) => {
    if (pageId === "__home") {
      setActivePage(null)
      setActiveSubpage(null)
    } else {
      setActivePage(pageId)
      setActiveSubpage(subpageId || null)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!activePage) {
    return <StarWarsHero onEnter={() => handleNavigate("charter")} onNavigate={handleNavigate} />
  }

  const page = rulesData.find(p => p.id === activePage)
  const subpage = activeSubpage ? page?.subpages?.find(s => s.id === activeSubpage) ?? null : null

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <StarBackground />

      {/* Top-right navigation — same as hero */}
      <div className="fixed top-0 right-0 z-30 flex items-start pointer-events-none">
        <div className="flex items-start pointer-events-auto">
          {[...topNavIds].reverse().map((id, i) => {
            const label = topNavLabels[id]
            const navPage = rulesData.find(p => p.id === id)
            const subpages = navPage?.subpages ?? []
            const isHovered = hoveredNav === id
            const isActive = activePage === id

            return (
              <div
                key={id}
                className="relative"
                onMouseEnter={() => setHoveredNav(id)}
                onMouseLeave={() => { setHoveredNav(null); setHoveredSub(null) }}
              >
                <button
                  onClick={() => handleNavigate(id)}
                  className="relative flex flex-col items-center px-4 pt-4 pb-2"
                >
                  <span
                    className="text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-colors duration-200"
                    style={{ color: isActive || isHovered ? "#00cccc" : "#00cccc66" }}
                  >
                    {label}
                  </span>
                  <span
                    className="block mt-1.5 rounded-sm transition-all duration-300"
                    style={{
                      height: "2px",
                      backgroundColor: "#00cccc",
                      width: isActive || isHovered ? "100%" : "24px",
                      boxShadow: isActive || isHovered ? "0 0 8px #00cccc88" : "none",
                    }}
                  />
                </button>

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
                              onClick={() => handleNavigate(id, sub.id)}
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
                                      onClick={() => handleNavigate(id, ssub.id)}
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
              </div>
            )
          })}
        </div>
      </div>

      {/* Page content */}
      <motion.div
        key={activePage + (activeSubpage || "")}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
      >
        {/* Title */}
        <div className="flex items-center gap-4 mb-6 w-full max-w-2xl">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #00cccc44)" }} />
          <h1 className="text-2xl md:text-3xl font-black tracking-widest uppercase text-center whitespace-nowrap" style={{ color: "#00cccc" }}>
            {subpage ? subpage.title : page?.title}
          </h1>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #00cccc44)" }} />
        </div>

        {/* Empty content area — ready to fill */}
        <div className="w-full max-w-2xl text-center">
          <p className="text-gray-700 text-sm tracking-widest uppercase">— раздел пуст —</p>
        </div>
      </motion.div>

      {/* Watermark */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-10">
        <p className="text-center text-xs text-white/20 tracking-wide max-w-lg">
          Данная информация, предоставленная на сайте, является собственностью Sunrise Team. Копирование любых данных строго запрещено.
        </p>
      </div>
    </div>
  )
}
