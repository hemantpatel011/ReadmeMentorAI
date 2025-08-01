import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sparkles, 
  Github, 
  Heart, 
  Users, 
  Zap, 
  Shield,
  Globe,
  ArrowRight
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          About Readme Mentor
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                     We&apos;re on a mission to help developers create better documentation 
           for their projects using the power of AI.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Card>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To democratize professional documentation by making it accessible 
              to every developer, regardless of their experience level. We believe 
                             great documentation shouldn&apos;t be a barrier to sharing amazing projects.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500 mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Our Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Built for students, developers, and open-source contributors who want 
              to showcase their work professionally. Join thousands of developers 
              who trust Readme Mentor for their documentation needs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Privacy First</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
                             We only analyze public repositories and don&apos;t store your code. 
              Your generated READMEs are yours to keep, and we respect your privacy 
              throughout the entire process.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 mb-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Open Source</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Readme Mentor is built in the open. We believe in transparency and 
              welcome contributions from the community. Check out our source code 
              and help us improve the platform.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold">Analyze</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your repository structure, dependencies, 
              and existing documentation to understand your project.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold">Generate</h3>
            <p className="text-muted-foreground">
              Multiple AI models work together to create comprehensive, 
              professional README content tailored to your project.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold">Customize</h3>
            <p className="text-muted-foreground">
              Review, edit, and download your README. Save it to your 
              account for future reference and improvements.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
          Ready to get started?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of developers who are already creating amazing documentation 
                     with Readme Mentor. It&apos;s free to try and takes less than a minute.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/generate">
              Generate README
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View Source
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          Made with <Heart className="inline h-4 w-4 text-red-500" /> for the developer community
        </p>
      </div>
    </div>
  )
}