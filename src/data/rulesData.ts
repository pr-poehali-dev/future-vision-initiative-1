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

export const rulesData: RulePage[] = []