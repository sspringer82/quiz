import { combineEpics, ofType } from 'redux-observable';
import { ActionType } from 'typesafe-actions';
import { GET_QUESTION, getQuestionSuccessAction } from './quiz.actions';
import { Observable, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Question } from '../Question';

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

export default combineEpics(getQuestionEpic);
