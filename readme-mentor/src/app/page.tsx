import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Sparkles, 
  Github, 
  Zap, 
  FileText, 
  Users, 
  CheckCircle,
  Code,
  Star,
  GitBranch
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Generate Professional{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                README Files
              </span>{" "}
              with AI
            </h1>
            
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              Transform your GitHub repositories with AI-generated, professional README.md files. 
              Perfect for students, developers, and open-source contributors who want to showcase 
              their projects with polished documentation.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/generate">
                  Generate README
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
            
            <div className="mt-16 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Free for students
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                AI-powered analysis
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                No signup required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need for great documentation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI analyzes your codebase and generates comprehensive README files automatically
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                Smart Code Analysis
              </h3>
              <p className="mt-2 text-muted-foreground">
                AI automatically detects your tech stack, dependencies, and project structure 
                to generate accurate documentation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                Lightning Fast
              </h3>
              <p className="mt-2 text-muted-foreground">
                Generate professional README files in seconds. Just paste your GitHub URL 
                and let our AI do the work.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                Professional Templates
              </h3>
              <p className="mt-2 text-muted-foreground">
                Get beautifully formatted README files with proper sections, badges, 
                and markdown styling.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                Student Friendly
              </h3>
              <p className="mt-2 text-muted-foreground">
                Perfect for college projects, hackathons, and learning. Help your work 
                stand out with professional documentation.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                Open Source Ready
              </h3>
              <p className="mt-2 text-muted-foreground">
                Generate README files that follow open source best practices with 
                contributing guidelines and license information.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                Multiple AI Models
              </h3>
              <p className="mt-2 text-muted-foreground">
                Uses a chain of AI models including Claude and Gemini for the most 
                accurate and comprehensive results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Generate professional README files in just three simple steps
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                Paste GitHub URL
              </h3>
              <p className="mt-2 text-muted-foreground">
                                 Simply paste your public GitHub repository URL. We&apos;ll analyze the entire codebase structure.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white text-xl font-bold">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                AI Analysis
              </h3>
              <p className="mt-2 text-muted-foreground">
                                 Our AI models analyze your code, detect technologies, and understand your project&apos;s purpose.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white text-xl font-bold">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                Download README
              </h3>
              <p className="mt-2 text-muted-foreground">
                Get your professionally formatted README.md file ready to copy or download.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-24 text-center sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to create amazing documentation?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of developers who are already using Readme Mentor to 
              create professional documentation for their projects.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/generate">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
