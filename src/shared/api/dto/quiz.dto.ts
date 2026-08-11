export interface QuizOptionStudent {
  id: number;
  text: string;
}

export interface QuizQuestionStudent {
  id: number;
  text: string;
  options: QuizOptionStudent[];
}

export interface QuizStudent {
  questions: QuizQuestionStudent[];
  isCompleted: boolean;
}

export interface QuizOptionAdmin {
  id?: number;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestionAdmin {
  id?: number;
  text: string;
  options: QuizOptionAdmin[];
}

export interface QuizAdmin {
  questions: QuizQuestionAdmin[];
}

export interface QuizAnswer {
  questionId: number;
  optionId: number;
}

export interface SubmitQuizDto {
  answers: QuizAnswer[];
}

export interface QuizSubmitResult {
  passed: boolean;
  isCompleted: boolean;
}

export interface PutQuizOptionDto {
  text: string;
  isCorrect: boolean;
}

export interface PutQuizQuestionDto {
  text: string;
  options: PutQuizOptionDto[];
}

export interface PutQuizDto {
  questions: PutQuizQuestionDto[];
}
