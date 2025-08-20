import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { CheckCircle2, AlertCircle, XCircle, TrendingUp, BookOpen, Users, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsVisualizationProps {
  results: AssessmentResult;
}

export function ResultsVisualization({ results }: ResultsVisualizationProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes': return <CheckCircle2 className="h-8 w-8 text-success" />;
      case 'maybe': return <AlertCircle className="h-8 w-8 text-warning" />;
      case 'no': return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes': return 'success';
      case 'maybe': return 'warning';
      case 'no': return 'destructive';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes': return 'Highly Recommended';
      case 'maybe': return 'Consider with Development';
      case 'no': return 'Explore Alternatives';
    }
  };

  const wiscarData = [
    { key: 'will', label: 'Will (Motivation)', value: results.wiscarScores.will, icon: Target },
    { key: 'interest', label: 'Interest (Passion)', value: results.wiscarScores.interest, icon: TrendingUp },
    { key: 'skill', label: 'Skill (Current Ability)', value: results.wiscarScores.skill, icon: CheckCircle2 },
    { key: 'cognitive', label: 'Cognitive (Thinking)', value: results.wiscarScores.cognitive, icon: BookOpen },
    { key: 'ability', label: 'Ability (Learning)', value: results.wiscarScores.ability, icon: Users },
    { key: 'realWorld', label: 'Real-World Fit', value: results.wiscarScores.realWorld, icon: Target }
  ];

  return (
    <div className="space-y-8">
      {/* Overall Recommendation */}
      <Card className="shadow-strong border-0 bg-gradient-to-br from-card to-primary-light/10">
        <CardContent className="pt-8">
          <div className="text-center">
            <div className="mb-4">
              {getRecommendationIcon()}
            </div>
            <Badge 
              className={cn(
                "mb-4 px-4 py-2 text-lg",
                getRecommendationColor() === 'success' && "bg-gradient-success text-success-foreground",
                getRecommendationColor() === 'warning' && "bg-warning text-warning-foreground",
                getRecommendationColor() === 'destructive' && "bg-destructive text-destructive-foreground"
              )}
            >
              {getRecommendationText()}
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Overall Score: {Math.round(results.overallScore)}%
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              {results.insights[0]}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Psychometric Fit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(results.psychometricScore)}%
                </div>
                <Progress value={results.psychometricScore} className="mb-4" />
              </div>
              <p className="text-sm text-muted-foreground">
                Measures personality alignment and intrinsic motivation for stakeholder engagement roles.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              Technical Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {Math.round(results.technicalScore)}%
                </div>
                <Progress value={results.technicalScore} className="mb-4" />
              </div>
              <p className="text-sm text-muted-foreground">
                Evaluates current knowledge of stakeholder management principles and practices.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WISCAR Framework */}
      <Card className="shadow-medium border-0">
        <CardHeader>
          <CardTitle className="text-2xl">WISCAR Framework Analysis</CardTitle>
          <p className="text-muted-foreground">
            Comprehensive evaluation across six key readiness dimensions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {wiscarData.map((item) => (
              <div key={item.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className="font-bold text-primary">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-medium border-0">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-secondary rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle className="text-success">Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-success-light text-success rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium border-0">
          <CardHeader>
            <CardTitle className="text-accent">Alternative Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.alternativePaths.map((path, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-gradient-secondary rounded-lg transition-colors">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{path}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confidence Score */}
      <Card className="shadow-medium border-0 bg-gradient-to-br from-primary-light/20 to-accent-light/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Assessment Confidence</h3>
            <div className="text-2xl font-bold text-primary mb-2">
              {results.confidenceScore}%
            </div>
            <p className="text-sm text-muted-foreground">
              Based on response consistency and depth of assessment
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}