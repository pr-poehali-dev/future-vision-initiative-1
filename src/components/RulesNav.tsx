import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { rulesData, RulePage, RuleSubpage } from "@/data/rulesData"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import Icon from "@/components/ui/icon"

interface RulesNavProps {
  activePage: string
  activeSubpage: string | null
  onNavigate: (pageId: string, subpageId?: string) => void
}

export default function RulesNav({ activePage, activeSubpage, onNavigate }: RulesNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

  const toggleDropdown = (pageId: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [pageId]: !prev[pageId] }))
  }

  const handleNavigate = (pageId: string, subpageId?: string) => {
    onNavigate(pageId, subpageId)
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigate("general")}
        >
          <span className="text-yellow-400 font-black text-lg tracking-widest uppercase">
            ⚔ СВОД ПРАВИЛ
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {rulesData.map((page) => (
            <div key={page.id} className="relative group">
              <button
                onClick={() =>
                  page.subpages?.length ? toggleDropdown(page.id) : handleNavigate(page.id)
                }
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded
                  ${activePage === page.id
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5"
                  }`}
              >
                {page.title}
                {page.subpages?.length ? (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${openDropdowns[page.id] ? "rotate-180" : ""}`}
                  />
                ) : null}
              </button>

              {/* Dropdown */}
              {page.subpages?.length && openDropdowns[page.id] && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-gray-900 border border-yellow-500/20 rounded shadow-xl z-50">
                  {page.subpages.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        handleNavigate(page.id, sub.id)
                        setOpenDropdowns({})
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-150
                        ${activeSubpage === sub.id
                          ? "text-yellow-400 bg-yellow-400/10"
                          : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5"
                        }`}
                    >
                      <ChevronRight size={12} className="inline mr-1 opacity-50" />
                      {sub.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-yellow-400 p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-950 border-t border-yellow-500/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {rulesData.map((page) => (
                <div key={page.id}>
                  <button
                    onClick={() => {
                      if (page.subpages?.length) {
                        toggleDropdown(page.id)
                      } else {
                        handleNavigate(page.id)
                      }
                    }}
                    className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded font-semibold text-sm
                      ${activePage === page.id ? "text-yellow-400 bg-yellow-400/10" : "text-gray-300"}`}
                  >
                    {page.title}
                    {page.subpages?.length ? (
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${openDropdowns[page.id] ? "rotate-180" : ""}`}
                      />
                    ) : null}
                  </button>
                  {page.subpages?.length && openDropdowns[page.id] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {page.subpages.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavigate(page.id, sub.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded
                            ${activeSubpage === sub.id ? "text-yellow-400 bg-yellow-400/10" : "text-gray-400 hover:text-yellow-400"}`}
                        >
                          <ChevronRight size={11} className="inline mr-1 opacity-50" />
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
