import React, { Component } from 'react'
import {
  Container, Col, Row,
  FormGroup, Label, Input,
  Button, FormFeedback
} from 'reactstrap';
import './Profile.css'
import Layout from '../../components/layout'
import Actions from './actions'


export default class Profile extends Component {
    constructor(props) {
      super(props);
    }
    

    render() {
        return (
        <Layout className="profile">
          <Row className="justify-content-center">
            <Col sm="2">
            <img src={require('../../images/face.png')} class="img-fluid"/>
        
            </Col>
            <Col sm="3">Username</Col>
          </Row> 
        </Layout>
        );
    }
}