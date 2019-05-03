import { createStandardAction } from 'typesafe-actions';
import { Question } from '../Question';

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const answerQuestionAction = createStandardAction(ANSWER_QUESTION)<
  number
>();

export const GET_QUESTION = 'GET_QUESTION';
export const getQuestionAction = createStandardAction(GET_QUESTION)<number>();

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const getQuestionSuccessAction = createStandardAction(
  GET_QUESTION_SUCCESS
)<Question>();
