import { combineEpics, ofType, StateObservable } from 'redux-observable';
import { ActionType } from 'typesafe-actions';
import {
  GET_QUESTION,
  getQuestionSuccessAction,
  ANSWER_QUESTION,
  getQuestionAction,
  finishAction,
} from './quiz.actions';
import { Observable, from, of } from 'rxjs';
import { mergeMap, map, delay } from 'rxjs/operators';
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
    mergeMap(() => {
      const questionId = state$.value.quiz.question!.next!;

      if (questionId === null) {
        return of(finishAction());
      }
      return of(getQuestionAction(questionId));
    })
  );
};

export default combineEpics(getQuestionEpic, answerQuestionEpic);
