import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Brain, Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  const features = [
    {
      icon: Brain,
      title: 'Psychometric Assessment',
      description: 'Evaluate personality traits and motivation alignment',
      duration: '8-10 min'
    },
    {
      icon: Target,
      title: 'Technical Knowledge',
      description: 'Test understanding of stakeholder engagement principles',
      duration: '6-8 min'
    },
    {
      icon: Users,
      title: 'WISCAR Framework',
      description: 'Comprehensive readiness across six key dimensions',
      duration: '8-10 min'
    }
  ];

  const outcomes = [
    'Personalized career fit assessment',
    'Detailed skill gap analysis',
    'Specific learning recommendations',
    'Alternative career path suggestions',
    'Professional development roadmap'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-primary text-primary-foreground px-4 py-2">
            Pathfinder Series
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Should I Become a Stakeholder Engagement Coach?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover your suitability for a career in stakeholder engagement through our comprehensive assessment framework
          </p>
        </div>

        {/* What is a Stakeholder Engagement Coach */}
        <Card className="mb-8 shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6 text-primary" />
              What is a Stakeholder Engagement Coach?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A Stakeholder Engagement Coach helps organizations and individuals build strong, productive relationships 
              with stakeholders—whether internal teams, clients, suppliers, or community members. This role requires 
              facilitation, communication, negotiation, conflict resolution, and strategic influence skills.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Typical Career Paths:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Stakeholder Engagement Coach
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Change Management Consultant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Communication Specialist
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Client Relationship Manager
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Project Manager
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-foreground">Key Success Traits:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Strong interpersonal skills
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Empathy and emotional intelligence
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Negotiation and conflict resolution
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Strategic thinking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    Adaptability and patience
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-soft border-0 hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <feature.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{feature.duration}</span>
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What You'll Get */}
        <Card className="mb-8 shadow-medium border-0">
          <CardHeader>
            <CardTitle className="text-xl">What You'll Discover</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-muted-foreground">{outcome}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-card to-primary-light/20 rounded-2xl p-8 shadow-strong">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Discover Your Path?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Complete our comprehensive assessment in just 20-25 minutes and get personalized insights about your career fit.
            </p>
            <Button 
              onClick={onStart}
              size="lg"
              className="bg-gradient-primary hover:bg-gradient-primary/90 shadow-medium hover:shadow-strong px-8 py-3 text-lg transition-all"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}