import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Users, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Psychometric Analysis",
      description: "Deep personality and motivation assessment"
    },
    {
      icon: Target,
      title: "Technical Evaluation",
      description: "Knowledge and aptitude testing"
    },
    {
      icon: Users,
      title: "WISCAR Framework",
      description: "Six-dimensional readiness analysis"
    },
    {
      icon: TrendingUp,
      title: "Career Guidance",
      description: "Personalized recommendations and next steps"
    }
  ];

  const benefits = [
    "Discover your natural fit for stakeholder coaching",
    "Get personalized learning recommendations",
    "Understand alternative career paths",
    "Receive detailed skill gap analysis",
    "Access professional development roadmap"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-primary text-primary-foreground px-4 py-2 text-sm">
            Career Pathfinder Series
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Should I Become a
            </span>
            <br />
            <span className="text-foreground">
              Stakeholder Engagement Coach?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your perfect career fit through our comprehensive assessment framework. 
            Get personalized insights in just 20 minutes.
          </p>
          
          <Button 
            onClick={() => navigate('/assessment')}
            size="lg"
            className="bg-gradient-primary hover:bg-gradient-primary/90 text-lg px-8 py-4 shadow-medium hover:shadow-strong transition-all mb-4"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Free • No registration required • 20-25 minutes
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Comprehensive Career Assessment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our scientifically-backed assessment evaluates your fit across multiple dimensions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft border-0 hover:shadow-medium transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-card/50 to-primary-light/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              What You'll Discover
            </h2>
            <p className="text-xl text-muted-foreground">
              Get detailed insights to make informed career decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4">
                <CheckCircle2 className="h-6 w-6 text-success mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-lg leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-strong border-0 bg-gradient-to-br from-card to-primary-light/20">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Ready to Discover Your Path?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Take the first step towards understanding your potential as a stakeholder engagement coach. 
                Our comprehensive assessment provides the clarity you need.
              </p>
              <Button 
                onClick={() => navigate('/assessment')}
                size="lg"
                className="bg-gradient-primary hover:bg-gradient-primary/90 text-lg px-8 py-4 shadow-medium hover:shadow-strong transition-all"
              >
                Begin Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
