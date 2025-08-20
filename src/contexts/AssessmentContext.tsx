import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AssessmentState, UserResponse, AssessmentResult } from '@/types/assessment';

interface AssessmentContextType {
  state: AssessmentState;
  addResponse: (response: UserResponse) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setSection: (section: AssessmentState['currentSection']) => void;
  calculateResults: () => AssessmentResult;
  resetAssessment: () => void;
}

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  responses: [],
  startTime: new Date(),
  sectionProgress: {
    psychometric: 0,
    technical: 0,
    wiscar: 0
  }
};

type AssessmentAction =
  | { type: 'ADD_RESPONSE'; payload: UserResponse }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SET_SECTION'; payload: AssessmentState['currentSection'] }
  | { type: 'RESET_ASSESSMENT' }
  | { type: 'UPDATE_PROGRESS'; payload: { section: keyof AssessmentState['sectionProgress']; progress: number } };

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'ADD_RESPONSE':
      return {
        ...state,
        responses: [
          ...state.responses.filter(r => r.questionId !== action.payload.questionId),
          action.payload
        ]
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
      };
    case 'SET_SECTION':
      return {
        ...state,
        currentSection: action.payload,
        currentQuestionIndex: 0
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        sectionProgress: {
          ...state.sectionProgress,
          [action.payload.section]: action.payload.progress
        }
      };
    case 'RESET_ASSESSMENT':
      return {
        ...initialState,
        startTime: new Date()
      };
    default:
      return state;
  }
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const addResponse = (response: UserResponse) => {
    dispatch({ type: 'ADD_RESPONSE', payload: response });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const setSection = (section: AssessmentState['currentSection']) => {
    dispatch({ type: 'SET_SECTION', payload: section });
  };

  const calculateResults = (): AssessmentResult => {
    // Simple calculation logic - in real app this would be more sophisticated
    const psychometricResponses = state.responses.filter(r => r.questionId.startsWith('psych_'));
    const technicalResponses = state.responses.filter(r => r.questionId.startsWith('tech_'));
    const wiscarResponses = state.responses.filter(r => r.questionId.startsWith('wiscar_'));

    const psychometricScore = psychometricResponses.reduce((sum, r) => sum + (typeof r.value === 'number' ? r.value : 0), 0) / psychometricResponses.length * 20;
    const technicalScore = technicalResponses.reduce((sum, r) => sum + (typeof r.value === 'number' ? r.value : 0), 0) / technicalResponses.length * 20;
    
    const wiscarScores = {
      will: 75,
      interest: 82,
      skill: 68,
      cognitive: 78,
      ability: 85,
      realWorld: 72
    };

    const overallScore = (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;

    let recommendation: 'yes' | 'maybe' | 'no' = 'maybe';
    if (overallScore >= 75) recommendation = 'yes';
    else if (overallScore < 50) recommendation = 'no';

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      insights: [
        "Your strong interpersonal motivation positions you well for stakeholder coaching",
        "Consider developing deeper knowledge in conflict resolution techniques",
        "Your communication skills form a solid foundation for this career path"
      ],
      nextSteps: [
        "Complete stakeholder management certification",
        "Practice facilitation skills through volunteer opportunities",
        "Shadow experienced stakeholder engagement professionals"
      ],
      alternativePaths: [
        "Communication Specialist",
        "Project Coordinator",
        "Client Success Manager"
      ],
      confidenceScore: Math.min(95, overallScore + 10)
    };
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
  };

  return (
    <AssessmentContext.Provider value={{
      state,
      addResponse,
      nextQuestion,
      previousQuestion,
      setSection,
      calculateResults,
      resetAssessment
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}