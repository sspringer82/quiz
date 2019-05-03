import { connect } from 'react-redux';
import { State } from '../reducers';
import { getQuestion, getAnswered } from './quiz.selector';
import Quiz from './Quiz.component';
import { Dispatch } from 'redux';
import { answerQuestionAction, getQuestionAction } from './quiz.actions';

function mapStateToProps(state: State) {
  return {
    question: getQuestion(state),
    answered: getAnswered(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    answerQuestion: (answer: number) => dispatch(answerQuestionAction(answer)),
    getQuestion: (id: number) => dispatch(getQuestionAction(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
