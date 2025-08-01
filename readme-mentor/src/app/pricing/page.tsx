import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  Check,
  ArrowRight,
  Crown,
  GraduationCap
} from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out Readme Mentor",
      price: "$0",
      period: "forever",
      icon: Sparkles,
      features: [
        "3 README generations per day",
        "Basic AI analysis",
        "Standard templates",
        "Copy & download",
        "Community support"
      ],
      cta: "Get Started",
      href: "/generate",
      popular: false
    },
    {
      name: "Student",
      description: "Ideal for students and learning projects",
      price: "$5",
      period: "month",
      icon: GraduationCap,
      features: [
        "15 README generations per day",
        "Advanced AI analysis",
        "Premium templates",
        "Copy & download",
        "Project history",
        "Priority support",
        "Student verification required"
      ],
      cta: "Start Student Plan",
      href: "/auth",
      popular: true
    },
    {
      name: "Pro",
      description: "For professional developers and teams",
      price: "$15",
      period: "month",
      icon: Crown,
      features: [
        "Unlimited README generations",
        "Advanced AI analysis",
        "All premium templates",
        "Copy & download",
        "Project history",
        "PDF export",
        "Priority support",
        "Custom branding",
        "Team collaboration"
      ],
      cta: "Start Pro Plan",
      href: "/auth",
      popular: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that fits your needs. Start free and upgrade as you grow.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mb-16">
        {plans.map((plan) => {
          const Icon = plan.icon
          return (
            <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    plan.name === 'Free' ? 'bg-gray-500' :
                    plan.name === 'Student' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2 text-left">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I try before I buy?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Absolutely! Start with our free plan to generate up to 3 READMEs per day. 
                No credit card required.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I qualify for student pricing?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Student verification is done through GitHub Student Developer Pack or 
                with a valid .edu email address.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You&apos;ll continue to have 
                access until the end of your billing period.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer team plans?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Team collaboration features are included in the Pro plan. For larger teams, 
                contact us for custom enterprise pricing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted/30 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
          Need help choosing a plan?
        </h2>
        <p className="text-muted-foreground mb-6">
          We&apos;re here to help you find the perfect plan for your needs.
        </p>
        <Button variant="outline" asChild>
          <Link href="/about">
            Contact Support
          </Link>
        </Button>
      </div>
    </div>
  )
}