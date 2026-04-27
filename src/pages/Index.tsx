import { useState } from "react"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { motion } from "framer-motion"
import RulesNav from "@/components/RulesNav"
import RulesContent from "@/components/RulesContent"
import StarWarsHero from "@/components/StarWarsHero"

export default function Index() {
  const [activePage, setActivePage] = useState<string | null>(null)
  const [activeSubpage, setActiveSubpage] = useState<string | null>(null)

  const handleNavigate = (pageId: string, subpageId?: string) => {
    setActivePage(pageId)
    setActiveSubpage(subpageId || null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEnter = () => {
    setActivePage("general")
    setActiveSubpage(null)
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50)
  }

  // Landing page (before entering rules)
  if (!activePage) {
    return <StarWarsHero onEnter={handleEnter} />
  }

  // Rules pages
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <RulesNav
        activePage={activePage}
        activeSubpage={activeSubpage}
        onNavigate={handleNavigate}
      />
      <div className="container mx-auto px-4 md:px-8 pt-24 pb-20 max-w-4xl">
        <RulesContent
          activePage={activePage}
          activeSubpage={activeSubpage}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  )
}
