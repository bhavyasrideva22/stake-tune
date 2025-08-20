import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question, UserResponse } from '@/types/assessment';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  onAnswer: (response: UserResponse) => void;
  currentResponse?: UserResponse;
  onNext: () => void;
  onPrevious?: () => void;
  questionNumber: number;
  totalQuestions: number;
  showPrevious?: boolean;
}

export function QuestionCard({
  question,
  onAnswer,
  currentResponse,
  onNext,
  onPrevious,
  questionNumber,
  totalQuestions,
  showPrevious = false
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentResponse?.value?.toString() || ''
  );

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
    const response: UserResponse = {
      questionId: question.id,
      value: question.type === 'scale' ? parseInt(value) : value,
      timestamp: new Date()
    };
    onAnswer(response);
  };

  const canProceed = selectedValue !== '';

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-primary bg-primary-light px-3 py-1 rounded-full">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {question.category} • {question.subcategory}
          </span>
        </div>
        <CardTitle className="text-xl leading-relaxed text-foreground">
          {question.text}
        </CardTitle>
        {question.scenario && (
          <div className="mt-4 p-4 bg-gradient-secondary rounded-lg border-l-4 border-accent">
            <p className="text-sm text-muted-foreground italic">{question.scenario}</p>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {question.type === 'scale' && question.scale ? (
            <div className="space-y-4">
              <RadioGroup 
                value={selectedValue} 
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {Array.from({ length: question.scale.max - question.scale.min + 1 }, (_, i) => {
                  const value = (question.scale!.min + i).toString();
                  const labelIndex = Math.min(i, question.scale!.labels.length - 1);
                  return (
                    <div key={value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gradient-secondary transition-colors">
                      <RadioGroupItem 
                        value={value} 
                        id={value}
                        className="text-primary border-primary"
                      />
                      <Label 
                        htmlFor={value} 
                        className="flex-1 cursor-pointer font-medium"
                      >
                        {question.scale!.labels[labelIndex]}
                      </Label>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {value}
                      </span>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          ) : (
            <RadioGroup 
              value={selectedValue} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gradient-secondary transition-colors">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    className="text-primary border-primary mt-1"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          {showPrevious && onPrevious ? (
            <Button 
              variant="outline" 
              onClick={onPrevious}
              className="px-6"
            >
              Previous
            </Button>
          ) : (
            <div />
          )}
          
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className={cn(
              "px-8 bg-gradient-primary hover:bg-gradient-primary/90 transition-all",
              canProceed && "shadow-medium hover:shadow-strong"
            )}
          >
            {questionNumber === totalQuestions ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}