
export type Page = 'home' | 'coaching' | 'visa' | 'countries' | 'contact' | 'quiz';

export interface StatItem {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  id: Page;
}

export interface Country {
  name: string;
  code: string;
  description: string;
}
