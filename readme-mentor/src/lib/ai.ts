import type { RepositoryData } from './github'

interface AIAnalysis {
  techStack: string[]
  projectPurpose: string
  keyFeatures: string[]
  installationSteps: string[]
  usageInstructions: string[]
  projectStructure: string
}

class OpenRouterService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || ''
  }

  async analyzeRepository(repoData: RepositoryData): Promise<AIAnalysis> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured')
    }

    const prompt = this.createAnalysisPrompt(repoData)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
          'X-Title': 'Readme Mentor'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-haiku:beta',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2048,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content

      if (!content) {
        throw new Error('No response from OpenRouter API')
      }

      return this.parseAnalysisResponse(content)
    } catch (error) {
      console.error('OpenRouter API error:', error)
      throw new Error('Failed to analyze repository with AI')
    }
  }

  private createAnalysisPrompt(repoData: RepositoryData): string {
    const fileStructure = repoData.files
      .filter(f => f.type === 'file')
      .slice(0, 50) // Limit to first 50 files
      .map(f => f.path)
      .join('\n')

    return `Analyze this GitHub repository and provide a structured analysis:

Repository: ${repoData.name}
Description: ${repoData.description}
Primary Language: ${repoData.language}
Topics: ${repoData.topics.join(', ')}

File Structure:
${fileStructure}

Package.json dependencies: ${repoData.packageJson ? JSON.stringify(Object.keys(repoData.packageJson.dependencies || {}), null, 2) : 'None'}

Existing README: ${repoData.existingReadme ? 'Yes (will be improved)' : 'No'}

Please provide a JSON response with the following structure:
{
  "techStack": ["array of technologies used"],
  "projectPurpose": "clear description of what this project does",
  "keyFeatures": ["array of main features/capabilities"],
  "installationSteps": ["array of installation commands/steps"],
  "usageInstructions": ["array of how to use the project"],
  "projectStructure": "brief explanation of the project organization"
}

Focus on being accurate and helpful for developers who want to understand and use this project.`
  }

  private parseAnalysisResponse(content: string): AIAnalysis {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          techStack: parsed.techStack || [],
          projectPurpose: parsed.projectPurpose || '',
          keyFeatures: parsed.keyFeatures || [],
          installationSteps: parsed.installationSteps || [],
          usageInstructions: parsed.usageInstructions || [],
          projectStructure: parsed.projectStructure || ''
        }
      }
    } catch (error) {
      console.error('Failed to parse AI response:', error)
    }

    // Fallback: extract information from plain text
    return {
      techStack: [],
      projectPurpose: 'A software project',
      keyFeatures: [],
      installationSteps: ['npm install', 'npm start'],
      usageInstructions: ['Follow the installation steps', 'Run the application'],
      projectStructure: 'Standard project structure'
    }
  }
}

class GeminiService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || ''
  }

  async improveReadme(analysis: AIAnalysis, repoData: RepositoryData): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured')
    }

    const prompt = this.createReadmePrompt(analysis, repoData)

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!content) {
        throw new Error('No response from Gemini API')
      }

      return this.formatReadmeOutput(content)
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate README with Gemini')
    }
  }

  private createReadmePrompt(analysis: AIAnalysis, repoData: RepositoryData): string {
    return `Create a professional, comprehensive README.md file for this repository:

Repository Name: ${repoData.name}
Description: ${repoData.description}
Language: ${repoData.language}
License: ${repoData.license?.name || 'Not specified'}

Analysis Data:
- Tech Stack: ${analysis.techStack.join(', ')}
- Purpose: ${analysis.projectPurpose}
- Key Features: ${analysis.keyFeatures.join(', ')}
- Installation: ${analysis.installationSteps.join(', ')}
- Usage: ${analysis.usageInstructions.join(', ')}

Please create a README with these sections:
1. # Project Title (with brief description)
2. ## Features (bullet points)
3. ## Technologies Used (badges if possible)
4. ## Installation (step-by-step)
5. ## Usage (with examples)
6. ## Project Structure (if relevant)
7. ## Contributing
8. ## License
9. ## Contact/Authors

Make it professional, clear, and developer-friendly. Use proper markdown formatting including code blocks, badges, and emojis where appropriate.`
  }

  private formatReadmeOutput(content: string): string {
    // Clean up the content and ensure proper markdown formatting
    let formatted = content.trim()
    
    // Ensure proper header spacing
    formatted = formatted.replace(/^#/gm, '\n#')
    formatted = formatted.replace(/\n\n+/g, '\n\n')
    
    return formatted.trim()
  }
}

class ReadmeGenerator {
  private openRouter: OpenRouterService
  private gemini: GeminiService

  constructor() {
    this.openRouter = new OpenRouterService()
    this.gemini = new GeminiService()
  }

  async generateReadme(repoData: RepositoryData): Promise<{
    readme: string
    analysis: AIAnalysis
  }> {
    try {
      // Step 1: Analyze repository structure and purpose with OpenRouter
      console.log('Analyzing repository with OpenRouter...')
      const analysis = await this.openRouter.analyzeRepository(repoData)

      // Step 2: Generate polished README with Gemini
      console.log('Generating README with Gemini...')
      const readme = await this.gemini.improveReadme(analysis, repoData)

      return {
        readme,
        analysis
      }
    } catch (error) {
      console.error('README generation error:', error)
      
      // Fallback: Generate a basic README
      const fallbackAnalysis: AIAnalysis = {
        techStack: [repoData.language],
        projectPurpose: repoData.description || 'A software project',
        keyFeatures: ['Core functionality'],
        installationSteps: ['Clone the repository', 'Install dependencies', 'Run the project'],
        usageInstructions: ['Follow installation steps', 'See documentation for usage'],
        projectStructure: 'Standard project structure'
      }

      const fallbackReadme = this.generateFallbackReadme(repoData, fallbackAnalysis)

      return {
        readme: fallbackReadme,
        analysis: fallbackAnalysis
      }
    }
  }

  private generateFallbackReadme(repoData: RepositoryData, analysis: AIAnalysis): string {
    return `# ${repoData.name}

${repoData.description || 'A software project built with modern technologies.'}

## Features

${analysis.keyFeatures.map(feature => `- ${feature}`).join('\n')}

## Technologies Used

${analysis.techStack.map(tech => `- ${tech}`).join('\n')}

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/[owner]/${repoData.name}

# Navigate to project directory
cd ${repoData.name}

# Install dependencies
npm install  # or yarn install
\`\`\`

## Usage

\`\`\`bash
# Start the development server
npm start  # or yarn start
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

${repoData.license ? `This project is licensed under the ${repoData.license.name} License.` : 'License information not available.'}

## Contact

For questions or suggestions, please open an issue in this repository.
`
  }
}

export const readmeGenerator = new ReadmeGenerator()
export type { AIAnalysis }