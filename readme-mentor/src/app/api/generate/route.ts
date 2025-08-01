import { NextRequest, NextResponse } from 'next/server'
import { githubService } from '@/lib/github'
import { readmeGenerator } from '@/lib/ai'
import { extractGithubInfo } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { githubUrl } = await request.json()

    if (!githubUrl) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      )
    }

    const repoInfo = extractGithubInfo(githubUrl)
    if (!repoInfo) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL format' },
        { status: 400 }
      )
    }

    // Step 1: Analyze GitHub repository
    const repositoryData = await githubService.analyzeRepository(
      repoInfo.owner,
      repoInfo.repo
    )

    // Step 2: Generate README with AI
    const result = await readmeGenerator.generateReadme(repositoryData)

    return NextResponse.json({
      success: true,
      data: {
        repository: repositoryData,
        analysis: result.analysis,
        readme: result.readme,
        techStack: githubService.detectTechStack(repositoryData)
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        success: false 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'README Generator API',
    status: 'healthy'
  })
}