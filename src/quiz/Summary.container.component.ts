import { connect } from 'react-redux';
import { State } from '../reducers';
import { getCount } from './quiz.selector';
import Summary from './Summary.componet';

function mapStateToProps(state: State) {
  return {
    count: getCount(state),
  };
}

export default connect(mapStateToProps)(Summary);
