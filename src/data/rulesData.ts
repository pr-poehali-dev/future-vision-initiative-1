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
    id: "general",
    title: "Общие Правила",
    content: "",
    subpages: [],
  },
  {
    id: "factions",
    title: "Фракции",
    content: "",
    subpages: [],
  },
  {
    id: "combat",
    title: "Боевые Правила",
    content: "",
    subpages: [],
  },
  {
    id: "force",
    title: "Пользователи Силы",
    content: "",
    subpages: [],
  },
  {
    id: "punishments",
    title: "Наказания",
    content: "",
    subpages: [],
  },
]
