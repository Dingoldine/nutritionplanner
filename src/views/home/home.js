import React, { Component } from 'react';
import Layout from '../../components/layout'
// import Actions from './actions'

class Home extends Component { // eslint-disable-line
  
  constructor(props) { // eslint-disable-line
    super(props);
  }

  render () {
    return (
      <Layout className="Home">
        Welcome Home
      </Layout>
    );
  }
}

export default Home;