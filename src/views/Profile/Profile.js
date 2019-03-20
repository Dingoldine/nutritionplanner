import React, { Component } from 'react'
import {
  Container, Col, Row,
  ListGroup, ListGroupItem,
  Button, FormFeedback
} from 'reactstrap';
import Slider from '../../components/slider.js'
import './Profile.css'
import Layout from '../../components/layout'
import Actions from './actions'

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};

export default class Profile extends Component {

    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        user: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };

      this.onBtnSave = this.onBtnSave.bind(this);
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
            calories: snapshot.data().calories,
            protein: snapshot.data().protein,
            carbs: snapshot.data().carbs,
            fat: snapshot.data().fat,
            loading: false,
          });
          console.log(snapshot.data());
          
        });
      }
    }

    handleChangeProtein = (event, protein) => {
      this.setState({ protein });
    };

    handleChangeCarbs = (event, carbs) => {
      this.setState({ carbs });
    };

    handleChangeFat = (event, fat) => {
      this.setState({ fat });
    };

    onBtnSave = () => {
      console.log("save");
    }
    
    render() {
      const { user, calories, carbs, protein, fat } = this.state

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
                <ListGroupItem>Total calories: {user.calories}</ListGroupItem>
                <ListGroupItem>Protein: {user.protein}</ListGroupItem>
                <ListGroupItem>Carbs: {user.carbs}</ListGroupItem>
                <ListGroupItem>Fat: {user.fat}</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="3" style={{textAlign: "center"}}>
              Change your settings
              <Slider onChange={this.handleChangeProtein} label="Protein" value={protein} min={0} max={300}/>
              <Slider onChange={this.handleChangeCarbs} label="Carbs" value={carbs} min={0} max={600}/>
              <Slider onChange={this.handleChangeFat} label="Fat" value={fat} min={0} max={200}/>
              <Button color="primary" onClick={() => this.onBtnSave()}>Save</Button>
            </Col>
          </Row>  
        </Layout>
        );
    }
}