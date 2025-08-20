export interface Question {
  id: string;
  text: string;
  type: 'scale' | 'multiple-choice' | 'scenario';
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
  scenario?: string;
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  weight: number;
}

export interface UserResponse {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  description: string;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScore;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
  alternativePaths: string[];
  confidenceScore: number;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: UserResponse[];
  startTime: Date;
  sectionProgress: {
    psychometric: number;
    technical: number;
    wiscar: number;
  };
}