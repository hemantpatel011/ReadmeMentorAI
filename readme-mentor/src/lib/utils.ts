import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractGithubInfo(url: string): { owner: string; repo: string } | null {
  const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/
  const match = url.match(githubRegex)
  
  if (!match) return null
  
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, '')
  }
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}