import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Personality & Motivation
  {
    id: 'psych_01',
    text: 'I genuinely enjoy helping others solve complex interpersonal problems.',
    type: 'scale',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    category: 'psychometric',
    subcategory: 'motivation',
    weight: 1.2
  },
  {
    id: 'psych_02',
    text: 'I feel energized when facilitating discussions between different stakeholder groups.',
    type: 'scale',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    category: 'psychometric',
    subcategory: 'interest',
    weight: 1.0
  },
  {
    id: 'psych_03',
    text: 'When facing conflict, I prefer to:',
    type: 'multiple-choice',
    options: [
      'Address it directly and find common ground',
      'Listen to all parties and mediate solutions',
      'Avoid confrontation and let others handle it',
      'Focus on facts and logical resolution'
    ],
    category: 'psychometric',
    subcategory: 'personality',
    weight: 1.1
  },
  {
    id: 'psych_04',
    text: 'I am comfortable being the person others turn to for relationship advice.',
    type: 'scale',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    category: 'psychometric',
    subcategory: 'personality',
    weight: 1.0
  },
  {
    id: 'psych_05',
    text: 'What motivates you most in your career?',
    type: 'multiple-choice',
    options: [
      'Making a meaningful impact on people and organizations',
      'Financial security and career advancement',
      'Recognition and professional status',
      'Personal growth and continuous learning'
    ],
    category: 'psychometric',
    subcategory: 'motivation',
    weight: 1.3
  },

  // Technical & Aptitude Section
  {
    id: 'tech_01',
    text: 'A primary stakeholder is someone who:',
    type: 'multiple-choice',
    options: [
      'Has the most authority in the organization',
      'Is directly affected by project outcomes',
      'Provides the most funding',
      'Makes the final decisions'
    ],
    category: 'technical',
    subcategory: 'knowledge',
    weight: 1.0
  },
  {
    id: 'tech_02',
    text: 'In active listening, the most important skill is:',
    type: 'multiple-choice',
    options: [
      'Asking clarifying questions',
      'Providing immediate solutions',
      'Reflecting back what you heard',
      'Taking detailed notes'
    ],
    category: 'technical',
    subcategory: 'communication',
    weight: 1.1
  },
  {
    id: 'tech_03',
    text: 'You notice two team members have conflicting priorities that affect project delivery. Your first step would be:',
    type: 'scenario',
    scenario: 'Two senior team members, Sarah and Mike, have been assigned to the same project but have different approaches. Sarah wants to prioritize client feedback sessions, while Mike insists on technical testing first. Their disagreement is causing delays.',
    options: [
      'Schedule a meeting with both to understand their perspectives',
      'Make a decision based on project timeline priorities',
      'Escalate to senior management immediately',
      'Suggest they work on separate project components'
    ],
    category: 'technical',
    subcategory: 'conflict-resolution',
    weight: 1.2
  },
  {
    id: 'tech_04',
    text: 'The most effective way to build stakeholder buy-in is through:',
    type: 'multiple-choice',
    options: [
      'Clear communication of benefits and addressing concerns',
      'Authority and formal mandate',
      'Financial incentives',
      'Peer pressure and social proof'
    ],
    category: 'technical',
    subcategory: 'engagement',
    weight: 1.1
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_01',
    text: 'I am willing to invest significant time learning stakeholder management frameworks.',
    type: 'scale',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    category: 'wiscar',
    subcategory: 'will',
    weight: 1.0
  },
  {
    id: 'wiscar_interest_01',
    text: 'I find organizational dynamics and relationship patterns fascinating.',
    type: 'scale',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    category: 'wiscar',
    subcategory: 'interest',
    weight: 1.0
  },
  {
    id: 'wiscar_skill_01',
    text: 'Rate your current ability to facilitate productive conversations between conflicting parties:',
    type: 'scale',
    scale: { min: 1, max: 5, labels: ['Poor', 'Below Average', 'Average', 'Good', 'Excellent'] },
    category: 'wiscar',
    subcategory: 'skill',
    weight: 1.1
  },
  {
    id: 'wiscar_cognitive_01',
    text: 'A client wants to rush a project launch, but your team needs more time for quality assurance. The client threatens to find another vendor. How do you approach this?',
    type: 'scenario',
    scenario: 'Your biggest client is pushing for an early launch date that would compromise quality. They\'re frustrated and mentioned considering other vendors.',
    options: [
      'Present data-driven risks and propose alternative timelines with incremental deliverables',
      'Agree to the timeline and work overtime to meet demands',
      'Stand firm on quality requirements regardless of client reaction',
      'Offer significant discounts to compensate for the rushed timeline'
    ],
    category: 'wiscar',
    subcategory: 'cognitive',
    weight: 1.2
  },
  {
    id: 'wiscar_ability_01',
    text: 'When receiving constructive feedback about my interpersonal style, I:',
    type: 'multiple-choice',
    options: [
      'Welcome it and actively seek specific examples for improvement',
      'Listen politely but privately question its validity',
      'Feel defensive but try to consider the points raised',
      'Prefer to focus on my strengths rather than weaknesses'
    ],
    category: 'wiscar',
    subcategory: 'ability',
    weight: 1.1
  },
  {
    id: 'wiscar_real_01',
    text: 'How comfortable would you be spending 60-70% of your time in meetings and conversations rather than independent work?',
    type: 'scale',
    scale: { min: 1, max: 5, labels: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'] },
    category: 'wiscar',
    subcategory: 'realWorld',
    weight: 1.0
  }
];

export const sectionInfo = {
  psychometric: {
    title: 'Personality & Motivation Assessment',
    description: 'Understanding your natural tendencies and what drives you',
    duration: '8-10 minutes'
  },
  technical: {
    title: 'Technical Knowledge & Aptitude',
    description: 'Testing your understanding of stakeholder engagement principles',
    duration: '6-8 minutes'
  },
  wiscar: {
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive readiness evaluation across six key dimensions',
    duration: '8-10 minutes'
  }
};