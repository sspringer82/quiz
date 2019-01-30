export interface Question {
  id: number;
  question: string;
  correct: number;
  answers: Answer[];
  next: number | null;
}

export interface Answer {
  id: number;
  answer: string;
}
