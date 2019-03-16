import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = (state) => {
  return {
    // test: state.Home.test,
    // testData: state.Home.testData
  }
};

export default connect(mapStateToProps)(Home);