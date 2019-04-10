import React, { Component } from 'react'
import {
  Container,
  Col,
  Row,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Form
} from 'reactstrap'
import { FaChevronRight, FaChevronLeft, FaCalendarAlt } from 'react-icons/fa'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Layout from '../../components/layout'
import ListItem from '../../components/listItem/listItem'
import FoodItem from '../../components/foodItem/foodItem'
import CircularProgress from '../../components/circularProgress/circularProgress'
import MacroProgressBar from '../../components/macroProgressBar/macroProgressBar'
import { makeGetFoodRequest } from '../../utils/api'
import './Home.css'
import dateFormat from 'dateformat'

class Home extends Component {
  // eslint-disable-line

  constructor(props) {
    // eslint-disable-line
    super(props)

    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleOutsideDropdownClick = this.handleOutsideDropdownClick.bind(this);
    this.triggerRenderHome = this.triggerRenderHome.bind(this);
    this.handleDeleteFoodItem = this.handleDeleteFoodItem.bind(this);
    this.displayConsumptionData = this.displayConsumptionData.bind(this)
    // this.handleModalClose = this.handleModalClose.bind(this);
    
    //  for creating a document with todays date
    const date = new Date();

    const today = dateFormat(date, "isoDate", true);

    this.state = {
      searchTerm: '',
      searchResult: [],
      isLoading: false,
      hasErrored: false,
      dropdownVisible: false,
      detailedNutritentInfo: [],
      dailyCalories: 0,
      dailyFats: 0,
      dailyProteins: 0,
      dailySugars: 0,
      dailyCarbs:  0,
      targetCalories: 0,
      targetProtein: 0,
      targetCarbs: 0,
      targetFats: 0,
      eatenFood: [],
      date: today,
      snapshot: []
    }

    this.node = React.createRef()

  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleDropdownClick, false)
  }

  componentDidMount(){
    this.fetchAndDisplay()
  }


  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleDropdownClick, false)
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  onSearch(e) { //eslint-disable-line
    e.preventDefault()

    this.setState({
      dropdownVisible: true
    })

    makeGetFoodRequest(this.state.searchTerm)      
    .then(res => {
        this.setState({
          searchResult: res.common
        })
      })
      .catch(err => {
        console.log(err)
        console.log('Error in onSearch')
      })
  }

  handleChange = async event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    // const { name } = target

    this.setState({
      searchTerm: value
    });
    
    // await makeGetFoodRequest(value)      
    // .then(res => {
    //     this.setState({
    //       [name]: value,
    //       searchResult: res.common
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     console.log('Error in handleChange')
    //   })

    //   if (this.state.searchResult.length > 0){
    //     this.setState({
    //       dropdownVisible: true
    //     })
    //   } else {
    //     this.setState({
    //       dropdownVisible: false
    //     })
    //   }
  }

  handleDeleteFoodItem(foodObject, index) {
    const { firebase } = this.props
    const currUser = firebase.auth.currentUser
    const { date, eatenFood } = this.state
    const { time } = foodObject

    if (currUser) {
      firebase
        .user(currUser.uid)
        .collection('consumption')
        .doc(date)
        .update({
          [time]: firebase.fieldValue.delete()
        })
        .then(() => {
          console.log('Successfully removed item')
          this.fetchAndDisplay()
        
        })
        .catch(err => {
          console.log(err)
          console.log('Failure to add a food item')
        }) 
    }
  }

  fetchAndDisplay() {
    const { firebase, history } = this.props
    const { date } = this.state
    //  store this for later use inside db fetch
    const _this = this;
    // if user is logged in, sanity check 
    firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        
        firebase
        .user(user.uid)
        .collection('consumption')
        .get()
        .then(function(querySnapshot) {
          _this.setState({
              snapshot: querySnapshot
            }, () => {
              _this.displayConsumptionData()
            })
        })
        .catch(err => {
          console.log(err)
          console.log('Failure to fetch an item')
        })
        
        firebase
        .user(user.uid)
        .onSnapshot(snapshot => {
          _this.setState({
          targetCalories: snapshot.data().settings.calories,
          targetProtein: snapshot.data().settings.protein,
          targetCarbs: snapshot.data().settings.carbs,
          targetFats: snapshot.data().settings.fat,
          })
        })
      } else {
        // No user is signed in.
        history.push('/')
      }
    })
  }

  displayConsumptionData(){
    const { snapshot, date } = this.state
    console.log(snapshot)

    this.setState({
      dailyCalories: 0,
      dailyFats: 0,
      dailyProteins: 0,
      dailySugars: 0,
      dailyCarbs:  0,
      eatenFood: []
    }, () => {
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
  
        //  only care about food eaten today for now
        if (doc.id === date){
          console.log("a match")
          console.log(doc.data())                
          this.parseFoodItems(doc.data())
        }           
      });
    })
}



  parseFoodItems(foodObject){
    const {dailyCalories, dailyFats, dailyProteins, dailySugars, dailyCarbs, eatenFood, date} = this.state
    const objectKeys = Object.keys(foodObject);
    console.log("HELOOOOO")
    console.log("objectKeys: ", objectKeys)
    let calories = 0
    let carbs = 0
    let fats = 0
    let proteins = 0
    let sugar = 0
    const foodData = []
    Object.entries(foodObject).forEach(([key, value]) => {
      //console.log(`key= ${key} value = ${value}`)
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line guard-for-in
      // eslint-disable-next-line prefer-const
      foodData.push(value)
      for (const property in value) {
        //console.log(`key = ${property} value = ${value[property]}`)
        switch(property) {
          case "calories":
            calories += value[property]
            break;
          // eslint-disable-next-line no-undef
          case "carbs":
            carbs += value[property]
            break;
          case "fats":
            fats += value[property]
            break;
          case "protein":
            proteins += value[property]
            break;
          case "sugar":
            sugar += value[property]
            break;
          default:
            // code block
        } 
      }
    })

    this.setState({
      dailyCalories: dailyCalories + calories,
      dailyCarbs: dailyCarbs + carbs,
      dailyFats: dailyFats + fats,
      dailyProteins: dailyProteins + proteins,
      dailySugars: dailySugars + sugar,
      eatenFood: eatenFood.concat(foodData)
    }, () => {
      console.log(this.state);
  });
  }

  handleOutsideDropdownClick(e) {
    console.log("click outside")
    if (this.state.dropdownVisible){
      this.setState({
        dropdownVisible: false,
        detailedNutritentInfo: []
      })
    }

  }

  handleDropdownClick(e) {
    // click is inside dropdown container, do nothing
    e.stopPropagation();
    if(this.state.dropdownVisible){
      if (this.node.current.contains(e.target)) {
        // if(this.state.modalVisible) {
        //   console.log("clicked outside while modal was open")
        // }
        return;
      }
    }
    // if the click is outside
    this.handleOutsideDropdownClick()
  }

  // eslint-disable-next-line class-methods-use-this
  triggerRenderHome(foodObject){
    //console.log("back in home baby")
    //console.log(foodObject)
    this.parseFoodItems(foodObject)

  }

  render() {
    const { searchResult, dropdownVisible, dailyFats, 
      dailyProteins, dailyCarbs, dailyCalories, eatenFood, targetCalories, targetFats, targetCarbs, targetProtein, date } = this.state
    const { firebase } = this.props
    console.log(date);
    
    console.log(eatenFood);
    
    return (
      <Layout className="home" >
        <Container fluid="true" className="home">
          <Row className="topMainRow">
            <Row style={{width: '100%',padding: '30px 0px 40px 0px'}}>
              <Col sm="4" className="eatenCol">
                <div className="eatenDiv">
                  <span>{dailyCalories.toFixed(0)}</span>
                  <p>kcal eaten</p>
                </div>
              </Col>
              <Col sm="4" className="circleCol">
                <p>remaining calories</p>
                <CircularProgress dailyCalories={dailyCalories} targetCalories={targetCalories} />
              </Col>   
              <Col sm="4"></Col>    
            </Row>
            <Row style={{width: '100%', paddingLeft: '30px'}}>
              <Col sm="3"></Col> 
              <Col sm="6" style={{ display: 'flex', justifyContent: 'center'}}>
                <Col sm="4" style={{ display: 'flex', justifyContent: 'center'}}>
                  <MacroProgressBar name="carbs" daily={dailyCarbs} target={targetCarbs} />
                </Col> 
                <Col sm="4" style={{ display: 'flex', justifyContent: 'center'}}>
                  <MacroProgressBar name="protein" daily={dailyProteins} target={targetProtein} />
                </Col> 
                <Col sm="4" style={{ display: 'flex', justifyContent: 'center'}}>
                  <MacroProgressBar name="fats" daily={dailyFats} target={targetFats} />
                </Col> 
              </Col> 
              <Col sm="3"></Col> 
            </Row>
          </Row>
          
          {/* Search field and button */}
          <Row className="search">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form className="form" onSubmit={e => this.onSearch(e)}>
                <InputGroup>
                  <Input
                    placeholder="Find a food"
                    onChange={e => { this.handleChange(e)}}
                    name="searchTerm"
                    autoComplete="off"
                  />
                  <InputGroupAddon addonType="prepend">
                    <Button type="submit">Search</Button>
                  </InputGroupAddon>
                </InputGroup>
                {dropdownVisible && (
                  <div className="dropdown-div">
                    <ul className ="dropdown-list"  onClick={this.handleDropdownClick} onKeyDown={this.handleDropdownClick} ref={this.node}>
                    {searchResult.map(item => (
                      <ListItem
                        foodName={item.food_name}
                        servingUnit={item.serving_unit}
                        servingQty={item.serving_qty}
                        photo={item.photo.thumb}
                        firebase={firebase}
                        key={item.food_name}
                        triggerRenderHome = {this.triggerRenderHome}
                      />
                    ))}
                  </ul>
                </div>
                )}
              </Form>
            </Col>
          </Row>
          <Row className="align-self-center">   
          <Col sm="12" md={{ size: 4, offset: 4 } } className="text-center">
            
            <div className="date-picker">

              <a data-slide="prev" role="button" className="left date-control" 
                onClick={() => {
                  var d = new Date(date);
                  d.setDate(d.getDate() - 1);
                  this.setState({
                    date: dateFormat(d, "isoDate", true)
                  }, () => {this.fetchAndDisplay()})
              }
              }><i> <FaChevronLeft/></i></a>

              <TransitionGroup style={{position: "relative", display: "inline-block", width: "200px"}}>
                <CSSTransition
                  key={date}
                  timeout={1000}
                  classNames="messageout"
                  >
                  <div className="date-container">
                    <p id="current-date-shown"><span><i><FaCalendarAlt/></i></span>{date}</p>
                  </div>
                
                </CSSTransition>
              </TransitionGroup>

              <a data-slide="next" role="button" className="right date-control" 
                onClick={() => {
                  var d = new Date(date);
                  d.setDate(d.getDate() + 1);
                  this.setState({
                    date: dateFormat(d, "isoDate", true)
                  }, () => {this.fetchAndDisplay()})
              }}><i><FaChevronRight/></i></a>

            </div> 
          </Col>
        </Row>
        <Row className="foodListRow">
          <div className="foodListWrapper">
            {eatenFood.map((foodObject,index) => (
              <FoodItem
                foodObject={foodObject}
                onClick={() => this.handleDeleteFoodItem(foodObject, index)}
              />
            ))}
        </div>
        </Row>
        <Row className="emptySpace">
        </Row>
        <Row className="footerRow">
          © Nutrition Planner - William Westerlund & Philip Rumman
        </Row>
      </Container>
    </Layout>
    )
  }
}

export default Home
