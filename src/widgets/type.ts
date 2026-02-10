export type Page = "constructor" | "school" | "user" | "logout"

export interface NavItem {
    label: string
    icon: string
    value: Page
    path: any
  }
  