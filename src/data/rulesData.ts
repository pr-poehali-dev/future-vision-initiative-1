export interface RulePage {
  id: string
  title: string
  content: string
  image?: string
  subpages?: RuleSubpage[]
}

export interface RuleSubpage {
  id: string
  title: string
  content: string
  image?: string
}

export const rulesData: RulePage[] = [
  {
    id: "additional",
    title: "Дополнительно",
    content: "",
    subpages: [],
  },
  {
    id: "formations",
    title: "Формирования",
    content: "",
    subpages: [],
  },
  {
    id: "positions",
    title: "Должности",
    content: "",
    subpages: [],
  },
  {
    id: "charter",
    title: "Основной Устав",
    content: "",
    subpages: [],
  },
]