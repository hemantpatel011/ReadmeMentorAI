"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Github, 
  Sparkles, 
  Download, 
  Copy, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Code,
  FileText
} from "lucide-react"
import { extractGithubInfo } from "@/lib/utils"
import type { RepositoryData } from "@/lib/github"
import type { AIAnalysis } from "@/lib/ai"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function GeneratePage() {
  const [githubUrl, setGithubUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [repoData, setRepoData] = useState<RepositoryData | null>(null)
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [generatedReadme, setGeneratedReadme] = useState("")
  const [techStack, setTechStack] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("input")

  const handleGenerate = async () => {
    if (!githubUrl.trim()) {
      setError("Please enter a GitHub repository URL")
      return
    }

    const repoInfo = extractGithubInfo(githubUrl)
    if (!repoInfo) {
      setError("Please enter a valid GitHub repository URL")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ githubUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate README')
      }

      if (data.success) {
        setRepoData(data.data.repository)
        setAnalysis(data.data.analysis)
        setGeneratedReadme(data.data.readme)
        setTechStack(data.data.techStack)
        setActiveTab("preview")
      }
    } catch (err) {
      console.error("Generation error:", err)
      setError(err instanceof Error ? err.message : "An error occurred while generating the README")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (generatedReadme) {
      await navigator.clipboard.writeText(generatedReadme)
      // Could add a toast notification here
    }
  }

  const handleDownload = () => {
    if (generatedReadme) {
      const blob = new Blob([generatedReadme], { type: "text/markdown" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "README.md"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const isValidUrl = githubUrl && extractGithubInfo(githubUrl)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Generate Professional README
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Paste your GitHub repository URL and let AI create a comprehensive, 
          professional README.md file for your project.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="input">
            <Github className="mr-2 h-4 w-4" />
            Repository Input
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={!analysis}>
            <Code className="mr-2 h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedReadme}>
            <Eye className="mr-2 h-4 w-4" />
            README Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Repository</CardTitle>
              <CardDescription>
                Enter the URL of your public GitHub repository to analyze and generate a README
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="https://github.com/username/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading || !isValidUrl}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                                 <p className="font-medium mb-2">✨ What we&apos;ll analyze:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Project structure and file organization</li>
                  <li>• Technology stack and dependencies</li>
                  <li>• Existing documentation (if any)</li>
                  <li>• Project purpose and functionality</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {repoData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Repository Analyzed Successfully
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{repoData.name}</h3>
                    <p className="text-muted-foreground">{repoData.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{repoData.language}</Badge>
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Files:</span> {repoData.files.length}
                    </div>
                    <div>
                      <span className="font-medium">Stars:</span> {repoData.stargazers_count}
                    </div>
                    <div>
                      <span className="font-medium">Forks:</span> {repoData.forks_count}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {analysis && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Purpose</h3>
                    <p className="text-sm text-muted-foreground">{analysis.projectPurpose}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1">
                      {analysis.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Installation Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {analysis.installationSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.usageInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <FileText className="mr-2 h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedReadme && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Generated README.md</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {generatedReadme}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}