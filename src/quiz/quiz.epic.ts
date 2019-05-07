import { combineEpics, ofType, StateObservable } from 'redux-observable';
import { ActionType } from 'typesafe-actions';
import {
  GET_QUESTION,
  getQuestionSuccessAction,
  ANSWER_QUESTION,
  getQuestionAction,
} from './quiz.actions';
import { Observable, from, of } from 'rxjs';
import { mergeMap, map, delay, filter } from 'rxjs/operators';
import { Question } from '../Question';
import { State } from '../reducers';

const getQuestionEpic = (action$: Observable<ActionType<any>>) =>
  action$.pipe(
    ofType(GET_QUESTION),
    mergeMap(action => {
      const fetchPromise = fetch(`/question/${action.payload}`).then(response =>
        response.json()
      );
      return from(fetchPromise).pipe(
        map((question: Question) => getQuestionSuccessAction(question))
      );
    })
  );

const answerQuestionEpic = (
  action$: Observable<ActionType<any>>,
  state$: StateObservable<State>
) => {
  return action$.pipe(
    ofType(ANSWER_QUESTION),
    delay(2000),
    filter(() => state$.value.quiz.question!.next! !== null),
    mergeMap(() => {
      const questionId = state$.value.quiz.question!.next!;
      return of(getQuestionAction(questionId));
    })
  );
};

export default combineEpics(getQuestionEpic, answerQuestionEpic);
