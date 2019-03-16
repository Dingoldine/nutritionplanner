import React, { Component } from 'react'
import './profile.css'
import Layout from '../../components/layout'
import Actions from './actions'

export default class Profile extends Component {
    constructor(props) {
      super(props);
    }
    

    render() {
        return (
        <Layout className="profile">Welcome to Profile yaah </Layout>
        );
    }
}