import { motion } from "framer-motion"
import { rulesData, RulePage, RuleSubpage } from "@/data/rulesData"
import { ChevronRight } from "lucide-react"

interface RulesContentProps {
  activePage: string
  activeSubpage: string | null
  onNavigate: (pageId: string, subpageId?: string) => void
}

export default function RulesContent({ activePage, activeSubpage, onNavigate }: RulesContentProps) {
  const page = rulesData.find((p) => p.id === activePage)
  if (!page) return null

  const subpage = activeSubpage ? page.subpages?.find((s) => s.id === activeSubpage) : null
  const displayContent = subpage || page

  return (
    <motion.div
      key={activePage + (activeSubpage || "")}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap">
        <button
          onClick={() => onNavigate("general")}
          className="hover:text-yellow-400 transition-colors"
        >
          Главная
        </button>
        <ChevronRight size={14} className="opacity-40" />
        <button
          onClick={() => onNavigate(page.id)}
          className={`transition-colors ${!subpage ? "text-yellow-400" : "hover:text-yellow-400"}`}
        >
          {page.title}
        </button>
        {subpage && (
          <>
            <ChevronRight size={14} className="opacity-40" />
            <span className="text-yellow-400">{subpage.title}</span>
          </>
        )}
      </div>

      {/* Header Image */}
      {page.image && !subpage && (
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-10">
          <img
            src={page.image}
            alt={page.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl md:text-5xl font-black tracking-wider text-white uppercase">
              {page.title}
            </h1>
          </div>
        </div>
      )}

      {/* Subpage header */}
      {subpage && (
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-wider text-yellow-400 uppercase mb-2">
            {subpage.title}
          </h1>
          <div className="h-0.5 w-20 bg-yellow-400/50 rounded" />
        </div>
      )}

      {/* Main Content */}
      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          {displayContent.content}
        </p>
      </div>

      {/* Subpages Grid (only on main page view) */}
      {!subpage && page.subpages && page.subpages.length > 0 && (
        <div>
          <h2 className="text-xl font-black tracking-wider text-gray-400 uppercase mb-5">
            Разделы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.subpages.map((sub, i) => (
              <motion.button
                key={sub.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onClick={() => onNavigate(page.id, sub.id)}
                className="text-left p-5 bg-gray-900/60 border border-yellow-500/10 hover:border-yellow-500/40 rounded-xl transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400/20 transition-colors">
                    <ChevronRight size={16} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">
                      {sub.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{sub.content}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* All pages navigation sidebar-like bottom nav */}
      {!subpage && (
        <div className="mt-16 pt-8 border-t border-yellow-500/10">
          <h2 className="text-sm font-black tracking-widest text-gray-500 uppercase mb-4">
            Все разделы
          </h2>
          <div className="flex flex-wrap gap-2">
            {rulesData.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${p.id === activePage
                    ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
                    : "bg-gray-900/60 text-gray-400 border border-gray-700/50 hover:border-yellow-500/30 hover:text-yellow-400"
                  }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
