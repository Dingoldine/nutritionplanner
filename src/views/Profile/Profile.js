import React, { Component } from 'react'
import {
  Container, Col, Row,
  ListGroup, ListGroupItem, Input,
  Button, FormFeedback
} from 'reactstrap';
import './Profile.css'
import Layout from '../../components/layout'
import Actions from './actions'


export default class Profile extends Component {

    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        user: "",
      };
    }

    componentDidMount() {
      const { user } = this.state
      if (user) {
        return;
      }

      const { firebase } = this.props
      const currUser = firebase.auth.currentUser
  
      this.setState({ loading: true });
      
      if(currUser) {
        this.unsubscribe = firebase
        .user(currUser.uid)
        .onSnapshot(snapshot => {
          this.setState({
            user: snapshot.data(),
            loading: false,
          });
          console.log(snapshot.data());
          
        });
      }
    }
    

    render() {
      const { user } = this.state
        return (
        <Layout className="profile">
          <Row className="justify-content-center">
            <Col sm="2">
            <img src={require('../../images/face.png')} className="img-fluid" alt=""/>
        
            </Col>
            <Col sm="3">
              <ListGroup>
                <ListGroupItem>Username: {user.username}</ListGroupItem>
                <ListGroupItem>Email: {user.email}</ListGroupItem>
              </ListGroup>
            </Col>
          </Row> 
        </Layout>
        );
    }
}