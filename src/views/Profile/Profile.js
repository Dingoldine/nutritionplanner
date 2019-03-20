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

    updateCalories = () => {
      const { protein, carbs, fat } = this.state
      const calories = (protein * 4 + carbs * 4 + fat * 9).toFixed(0)
      this.setState({ calories })
    }

    handleChangeProtein = (event, Protein) => {
      const protein = Protein.toFixed(0)
      this.setState({ protein });
      this.updateCalories()
    };

    handleChangeCarbs = (event, Carbs) => {
      const carbs = Carbs.toFixed(0)
      this.setState({ carbs });
      this.updateCalories()
    };

    handleChangeFat = (event, Fat) => {
      const fat = Fat.toFixed(0)
      this.setState({ fat });
      this.updateCalories()
    };

    onBtnSave = () => {
      const { firebase } = this.props
      const { protein, carbs, fat, calories } = this.state
      const currUser = firebase.auth.currentUser
      if(currUser) {
        firebase.user(currUser.uid).set(
          {
            protein,
            carbs,
            fat,
            calories
          },
          {merge: true}
        ).then(() => {
          console.log("Success");
        }).catch(err => {
          console.log(err);
          console.log("Failure to update user data");
        })
      }
    }
    
    render() {
      const { user, calories, carbs, protein, fat } = this.state

        return (
        <Layout className="profile">
          <Row className="justify-content-center" style={{marginTop: 100, marginBottom: 50}}>
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
              <div style={{fontSize: 25}}>Change your settings</div>
              <div style={{fontSize: 18, marginBottom: 20}}>Calories: {calories}</div>
              <Slider onChange={this.handleChangeProtein} label="Protein" value={protein} min={0} max={300} kcal={4}/>
              <Slider onChange={this.handleChangeCarbs} label="Carbs" value={carbs} min={0} max={600} kcal={4}/>
              <Slider onChange={this.handleChangeFat} label="Fat" value={fat} min={0} max={200} kcal={9}/>
              <Button color="primary" onClick={() => this.onBtnSave()}>Save</Button>
            </Col>
          </Row>  
        </Layout>
        );
    }
}