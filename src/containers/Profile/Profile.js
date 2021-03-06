import React, { Component } from 'react'
import { Container, Col, Row, ListGroup, ListGroupItem, Button, Fade } from 'reactstrap'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import Slider from '../../components/Slider/Slider'
import './Profile.css'
import Layout from '../../components/Layout/Layout'
import PieChart from  '../../components/PieChart/PieChart'


//  makes sure first render dont fail when trying to access user.settings
const initialUserState = {
  username: "",
  email: "",
  settings: []
}

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: initialUserState,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fadeIn: false,
    }

    this.onBtnSave = this.onBtnSave.bind(this)
    this.toggleFade = this.toggleFade.bind(this)
  }

  componentDidMount() {
    const { user } = this.state
    if (user !== initialUserState) {
      return
    }

    const { firebase, history } = this.props
    
    //  save this to use below 
    const _this = this
    
    firebase.auth.onAuthStateChanged((user_) => {
      if (user_) {
        firebase.user(user_.uid)
        .onSnapshot(snapshot => {
          _this.setState({
            user: snapshot.data(),
            calories: snapshot.data().settings.calories,
            protein: snapshot.data().settings.protein,
            carbs: snapshot.data().settings.carbs,
            fat: snapshot.data().settings.fat,
            loading: false
          })
        })
      } else {
        // No user is signed in.
        history.push('/')
      }
    })
  }

  updateCalories = () => {
    const { protein, carbs, fat } = this.state
    const calories = Math.round((protein * 4 + carbs * 4 + fat * 9))
    this.setState({ calories, fadeIn: false })
  }

  handleChangeProtein = (event, Protein) => {
    const protein = Math.round(Protein)
    this.setState({ protein })
    this.updateCalories()
  }

  handleChangeCarbs = (event, Carbs) => {
    const carbs = Math.round(Carbs)
    this.setState({ carbs })
    this.updateCalories()
  }

  handleChangeFat = (event, Fat) => {
    const fat = Math.round(Fat)
    this.setState({ fat })
    this.updateCalories()
  }

  onBtnSave = () => {
    const { firebase } = this.props
    const { protein, carbs, fat, calories } = this.state
    const currUser = firebase.auth.currentUser
    if (currUser) {
      firebase
        .user(currUser.uid)
        .set( 
          {
          settings: {
            protein,
            carbs,
            fat,
            calories
            }
          },
          { merge: true }
        )
        .then(() => {
          //  console.log('Success')
          this.toggleFade()
        })
        .catch(err => {
          console.log("'Failure to update user data'", err)
        })
    }
  }

  toggleFade() {
    const { fadeIn } = this.state
    this.setState({
        fadeIn: !fadeIn
    });
  }

  render() {
    const { user, calories, carbs, protein, fat, fadeIn } = this.state
    
    return (
      <Layout className="profile">
        <Container fluid>
          <Row className="justify-content-center topProfileContainer">
            
            <Col md={{size:5 , offset: -1}} className="chartCol">
              <PieChart dailyCarbs = {carbs * 4} dailyFats ={fat*9} dailyProteins = {protein*4}/>
            </Col>
            <Col md={{size:5 , offset: 1}} className="profileInfoCol">
              <ListGroup className="profileInfoContainer">
                <p className="mediumFont userInfoHeading uppercase">Profile Info</p>
                <ListGroupItem className="smallFont"><FaUser className="profileIcon"/> {user.username}</ListGroupItem>
                <ListGroupItem className="smallFont"><FaEnvelope className="profileIcon"/> {user.email}</ListGroupItem>
                <ListGroupItem className="smallFont">Daily calories: <span className="profileInfoNumbers">{user.settings.calories} kcal</span></ListGroupItem>
                <ListGroupItem className="smallFont">Daily protein: <span className="profileInfoNumbers">{user.settings.protein}g</span></ListGroupItem>
                <ListGroupItem className="smallFont">Daily carbs: <span className="profileInfoNumbers">{user.settings.carbs}g</span></ListGroupItem>
                <ListGroupItem className="smallFont">Daily fat: <span className="profileInfoNumbers">{user.settings.fat}g</span></ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="3" style={{ textAlign: 'center' }} className="bottomProfileContainer">
              <div className="changeSettingsDiv mediumFont uppercase">Change your settings</div>
              <div className="changeCaloriesDiv mediumFont">Total: {calories} kcal</div>
              <div className="macroSliderContainer">
                <Slider onChange={this.handleChangeProtein} label="Protein" value={protein} min={0} max={300} kcal={4} />
                <Slider onChange={this.handleChangeCarbs} label="Carbs" value={carbs} min={0} max={600} kcal={4} />
                <Slider onChange={this.handleChangeFat} label="Fat" value={fat} min={0} max={200} kcal={9} />
              </div>
              <Button className="saveButton smallFont" onClick={() => this.onBtnSave()}>
                Save
              </Button>
              <Fade in={fadeIn} tag="h5" className="extraSmallFont savedMessage" >
                    Your settings have been saved!
              </Fade>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}
