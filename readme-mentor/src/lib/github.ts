interface GitHubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  content?: string
  size?: number
}

interface RepositoryData {
  name: string
  description: string
  language: string
  topics: string[]
  stargazers_count: number
  forks_count: number
  license?: {
    name: string
    spdx_id: string
  }
  files: GitHubFile[]
  packageJson?: Record<string, unknown>
  existingReadme?: string | null
}

const GITHUB_API_BASE = 'https://api.github.com'

class GitHubService {
  private async fetchWithAuth(url: string) {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'ReadmeMentor/1.0'
    }

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  private async getFileContent(owner: string, repo: string, path: string): Promise<string | null> {
    try {
      const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`
      const data = await this.fetchWithAuth(url)
      
      if (data.content && data.encoding === 'base64') {
        return Buffer.from(data.content, 'base64').toString('utf-8')
      }
      return null
    } catch (error) {
      console.log(`Could not fetch ${path}:`, error)
      return null
    }
  }

  private async getRepositoryTree(owner: string, repo: string): Promise<GitHubFile[]> {
    try {
      const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/main?recursive=1`
      const data = await this.fetchWithAuth(url)
      
      return data.tree.map((item: { path: string; type: string; size?: number }) => ({
        name: item.path.split('/').pop(),
        path: item.path,
        type: item.type === 'tree' ? 'dir' : 'file',
        size: item.size
      }))
    } catch {
      // Try 'master' branch if 'main' doesn't exist
      try {
        const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/master?recursive=1`
        const data = await this.fetchWithAuth(url)
        
        return data.tree.map((item: { path: string; type: string; size?: number }) => ({
          name: item.path.split('/').pop(),
          path: item.path,
          type: item.type === 'tree' ? 'dir' : 'file',
          size: item.size
        }))
      } catch (fallbackError) {
        console.error('Could not fetch repository tree:', fallbackError)
        return []
      }
    }
  }

  async analyzeRepository(owner: string, repo: string): Promise<RepositoryData> {
    try {
      // Get repository metadata
      const repoUrl = `${GITHUB_API_BASE}/repos/${owner}/${repo}`
      const repoData = await this.fetchWithAuth(repoUrl)

      // Get file structure
      const files = await this.getRepositoryTree(owner, repo)

      // Get package.json if it exists
      let packageJson = null
      const packageFile = files.find(f => f.name === 'package.json' && f.path === 'package.json')
      if (packageFile) {
        const content = await this.getFileContent(owner, repo, 'package.json')
        if (content) {
          try {
            packageJson = JSON.parse(content)
                  } catch {
          console.log('Could not parse package.json')
        }
        }
      }

      // Get existing README if it exists
      let existingReadme = null
      const readmeFile = files.find(f => 
        f.name?.toLowerCase().startsWith('readme') && 
        (f.name.endsWith('.md') || f.name.endsWith('.txt'))
      )
      if (readmeFile) {
        existingReadme = await this.getFileContent(owner, repo, readmeFile.path)
      }

      return {
        name: repoData.name,
        description: repoData.description || '',
        language: repoData.language || 'Unknown',
        topics: repoData.topics || [],
        stargazers_count: repoData.stargazers_count || 0,
        forks_count: repoData.forks_count || 0,
        license: repoData.license,
        files,
        packageJson,
        existingReadme
      }
    } catch (error) {
      console.error('Error analyzing repository:', error)
      throw new Error('Failed to analyze repository. Please check the URL and try again.')
    }
  }

  detectTechStack(data: RepositoryData): string[] {
    const techStack: Set<string> = new Set()

    // From primary language
    if (data.language) {
      techStack.add(data.language)
    }

    // From package.json dependencies
    if (data.packageJson?.dependencies) {
      const deps = Object.keys(data.packageJson.dependencies)
      
      // Frontend frameworks
      if (deps.includes('react')) techStack.add('React')
      if (deps.includes('vue')) techStack.add('Vue.js')
      if (deps.includes('angular')) techStack.add('Angular')
      if (deps.includes('next')) techStack.add('Next.js')
      if (deps.includes('nuxt')) techStack.add('Nuxt.js')
      if (deps.includes('svelte')) techStack.add('Svelte')

      // Backend frameworks
      if (deps.includes('express')) techStack.add('Express.js')
      if (deps.includes('koa')) techStack.add('Koa.js')
      if (deps.includes('fastify')) techStack.add('Fastify')
      if (deps.includes('hapi')) techStack.add('Hapi.js')

      // Databases
      if (deps.includes('mongoose')) techStack.add('MongoDB')
      if (deps.includes('pg') || deps.includes('postgres')) techStack.add('PostgreSQL')
      if (deps.includes('mysql2') || deps.includes('mysql')) techStack.add('MySQL')
      if (deps.includes('sqlite3')) techStack.add('SQLite')

      // Styling
      if (deps.includes('tailwindcss')) techStack.add('Tailwind CSS')
      if (deps.includes('styled-components')) techStack.add('Styled Components')
      if (deps.includes('emotion')) techStack.add('@emotion')

      // State management
      if (deps.includes('redux')) techStack.add('Redux')
      if (deps.includes('zustand')) techStack.add('Zustand')
      if (deps.includes('recoil')) techStack.add('Recoil')

      // Testing
      if (deps.includes('jest')) techStack.add('Jest')
      if (deps.includes('vitest')) techStack.add('Vitest')
      if (deps.includes('cypress')) techStack.add('Cypress')
    }

    // From file extensions and names
    data.files.forEach(file => {
      const ext = file.name?.split('.').pop()?.toLowerCase()
      
      switch (ext) {
        case 'py':
          techStack.add('Python')
          break
        case 'rs':
          techStack.add('Rust')
          break
        case 'go':
          techStack.add('Go')
          break
        case 'rb':
          techStack.add('Ruby')
          break
        case 'php':
          techStack.add('PHP')
          break
        case 'java':
          techStack.add('Java')
          break
        case 'kt':
          techStack.add('Kotlin')
          break
        case 'swift':
          techStack.add('Swift')
          break
        case 'dart':
          techStack.add('Dart')
          break
      }

      // Special files
      if (file.name === 'Dockerfile') techStack.add('Docker')
      if (file.name === 'docker-compose.yml') techStack.add('Docker Compose')
      if (file.name === 'requirements.txt') techStack.add('Python')
      if (file.name === 'Cargo.toml') techStack.add('Rust')
      if (file.name === 'go.mod') techStack.add('Go')
      if (file.name === 'pubspec.yaml') techStack.add('Flutter')
    })

    return Array.from(techStack)
  }
}

export const githubService = new GitHubService()
export type { RepositoryData, GitHubFile }