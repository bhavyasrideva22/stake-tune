import { useState, useEffect } from 'react';
import { AssessmentIntro } from '@/components/assessment/AssessmentIntro';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ResultsVisualization } from '@/components/assessment/ResultsVisualization';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAssessment } from '@/contexts/AssessmentContext';
import { assessmentQuestions, sectionInfo } from '@/data/questions';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function Assessment() {
  const { 
    state, 
    addResponse, 
    nextQuestion, 
    previousQuestion, 
    setSection, 
    calculateResults, 
    resetAssessment 
  } = useAssessment();

  const [currentResults, setCurrentResults] = useState(null);

  // Get questions for current section
  const getCurrentSectionQuestions = () => {
    switch (state.currentSection) {
      case 'psychometric':
        return assessmentQuestions.filter(q => q.category === 'psychometric');
      case 'technical':
        return assessmentQuestions.filter(q => q.category === 'technical');
      case 'wiscar':
        return assessmentQuestions.filter(q => q.category === 'wiscar');
      default:
        return [];
    }
  };

  const currentSectionQuestions = getCurrentSectionQuestions();
  const currentQuestion = currentSectionQuestions[state.currentQuestionIndex];
  const totalQuestions = currentSectionQuestions.length;

  // Calculate overall progress
  const getOverallProgress = () => {
    const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric').length;
    const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical').length;
    const wiscarQuestions = assessmentQuestions.filter(q => q.category === 'wiscar').length;
    const totalAllQuestions = psychometricQuestions + technicalQuestions + wiscarQuestions;

    let completedQuestions = 0;
    if (state.currentSection === 'psychometric') {
      completedQuestions = state.currentQuestionIndex;
    } else if (state.currentSection === 'technical') {
      completedQuestions = psychometricQuestions + state.currentQuestionIndex;
    } else if (state.currentSection === 'wiscar') {
      completedQuestions = psychometricQuestions + technicalQuestions + state.currentQuestionIndex;
    } else if (state.currentSection === 'results') {
      completedQuestions = totalAllQuestions;
    }

    return (completedQuestions / totalAllQuestions) * 100;
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      // Move to next section or results
      switch (state.currentSection) {
        case 'psychometric':
          setSection('technical');
          break;
        case 'technical':
          setSection('wiscar');
          break;
        case 'wiscar':
          const results = calculateResults();
          setCurrentResults(results);
          setSection('results');
          break;
      }
    }
  };

  const getCurrentResponse = () => {
    return state.responses.find(r => r.questionId === currentQuestion?.id);
  };

  const handleStartAssessment = () => {
    setSection('psychometric');
  };

  const handleRetakeAssessment = () => {
    resetAssessment();
    setCurrentResults(null);
  };

  const handleBackToIntro = () => {
    setSection('intro');
  };

  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStart={handleStartAssessment} />;
  }

  if (state.currentSection === 'results' && currentResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10 p-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="outline" 
              onClick={handleBackToIntro}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRetakeAssessment}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Assessment
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Your Assessment Results
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your fit for stakeholder engagement coaching
            </p>
          </div>

          <ResultsVisualization results={currentResults} />
        </div>
      </div>
    );
  }

  const currentSectionInfo = sectionInfo[state.currentSection as keyof typeof sectionInfo];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/10 to-accent-light/10 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToIntro}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Intro
          </Button>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <p className="font-semibold text-primary">{Math.round(getOverallProgress())}% Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar 
          progress={getOverallProgress()} 
          className="mb-8" 
          showPercentage={false}
        />

        {/* Section Info */}
        {currentSectionInfo && (
          <Card className="mb-6 shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-xl">{currentSectionInfo.title}</CardTitle>
              <p className="text-muted-foreground">{currentSectionInfo.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Section Progress: {state.currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-muted-foreground">
                  Est. time: {currentSectionInfo.duration}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question */}
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={addResponse}
            currentResponse={getCurrentResponse()}
            onNext={handleNext}
            onPrevious={state.currentQuestionIndex > 0 ? previousQuestion : undefined}
            questionNumber={state.currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            showPrevious={state.currentQuestionIndex > 0}
          />
        )}
      </div>
    </div>
  );
}