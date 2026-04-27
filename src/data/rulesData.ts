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
  subpages?: RuleSubpage[]
}

export const rulesData: RulePage[] = [
  {
    id: "additional",
    title: "Дополнительно",
    content: "",
    subpages: [
      { id: "additional-tribunal",   title: "Трибунал",              content: "" },
      { id: "additional-battalion",  title: "Ударный Батальон",      content: "" },
      { id: "additional-specs",      title: "Специализации",         content: "" },
      {
        id: "additional-droids",
        title: "Виды Дроидов",
        content: "",
        subpages: [
          { id: "droids-neutral", title: "Нейтральные Дроиды", content: "" },
          { id: "droids-cis",     title: "Дроиды КНС",         content: "" },
        ],
      },
      {
        id: "additional-weapons",
        title: "Вооружение",
        content: "",
        subpages: [
          { id: "weapons-gar", title: "Вооружение ВАР", content: "" },
          { id: "weapons-cis", title: "Вооружение КНС", content: "" },
        ],
      },
      {
        id: "additional-tech",
        title: "Техника",
        content: "",
        subpages: [
          { id: "tech-gar", title: "Техника ВАР", content: "" },
          { id: "tech-cis", title: "Техника КНС", content: "" },
        ],
      },
    ],
  },
  {
    id: "formations",
    title: "Формирования",
    content: "",
    subpages: [
      { id: "formations-rsb",      title: "РСБ",                                content: "" },
      { id: "formations-fleet",    title: "4-ый Флот",                          content: "" },
      { id: "formations-guard",    title: "17-ый Гвардейский Батальон",         content: "" },
      { id: "formations-regular",  title: "Регулярные Формирования",            content: "" },
      {
        id: "formations-special",
        title: "Формирования Специального Назначения",
        content: "",
        subpages: [
          { id: "special-sob", title: "SOB", content: "" },
          { id: "special-arc", title: "ARC", content: "" },
          { id: "special-arf", title: "ARF", content: "" },
        ],
      },
    ],
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