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
import dateFormat from 'dateformat'
import Layout from '../../components/layout'
import ListItem from '../../components/listItem/listItem'
import FoodItem from '../../components/foodItem/foodItem'
import CircularProgress from '../../components/circularProgress/circularProgress'
import MacroProgressBar from '../../components/macroProgressBar/macroProgressBar'
import BarChart from '../../components/barchart/barchart'
import { makeGetFoodRequest } from '../../utils/api'
import './Home.css'


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
    const { searchTerm } = this.state

    this.setState({
      dropdownVisible: true
    })

    makeGetFoodRequest(searchTerm)      
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

  async parseEatenFood() {
    const { eatenFood } = this.state
    console.log("In parse eaten food", eatenFood)


    let calories = 0
    let carbs = 0
    let fats = 0
    let proteins = 0
    let sugar = 0

    await eatenFood.forEach((foodItem) =>{
      console.log(foodItem.calories, foodItem.carbs, foodItem.fats, foodItem.protein, foodItem.sugar)
      calories += foodItem.calories
      carbs += foodItem.carbs
      fats += foodItem.fats
      proteins += foodItem.protein
      sugar += foodItem.sugar
    })

    this.setState({
      dailyCalories: calories,
      dailyCarbs: carbs,
      dailyFats: fats,
      dailyProteins: proteins,
      dailySugars: sugar,
    }, () => {
      console.log(this.state)
    })
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
          //this.fetchAndDisplay()
          const array = eatenFood
          array.splice(index, 1)
          this.setState({
            eatenFood: array
          }, () => {
            this.parseEatenFood()
          })
        
        })
        .catch(err => {
          console.log(err)
          console.log('Failure to add a food item')
        }) 
    }
  }

  fetchAndDisplay() {
    const { firebase, history } = this.props
    //  store this for later use inside db fetch
    const _this = this;

    //  reset then fetch
    this.setState({
      dailyCalories: 0,
      dailyFats: 0,
      dailyProteins: 0,
      dailySugars: 0,
      dailyCarbs:  0,
      eatenFood: []
    }, () => {

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
    })

}

  displayConsumptionData(){
    const { snapshot, date, eatenFood } = this.state

    console.log("IN DISPLAY CONSUPMTION DATA", eatenFood)
    snapshot.forEach((doc) => {
      //  only care about food eaten today for now
      if (doc.id === date){
        console.log("a match")

        //  add to eatenFood
        const foodList = []
        Object.entries(doc.data()).forEach(([key, foodItem]) => {
          foodList.push(foodItem)
        })               
        this.setState({
          eatenFood: eatenFood.concat(foodList)
        }, () => {
          this.parseEatenFood()
        });
      }           
    });

}



  handleOutsideDropdownClick(e) {
    const { dropdownVisible } = this.state
    console.log("click outside")
    if (dropdownVisible){
      this.setState({
        dropdownVisible: false,
      })
    }

  }

  handleDropdownClick(e) {
    const { dropdownVisible } = this.state
    // click is inside dropdown container, do nothing
    e.stopPropagation();
    if(dropdownVisible){
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
    const { eatenFood } = this.state
    const item = []
    Object.entries(foodObject).forEach(([key, foodItem]) => {
      item.push(foodItem)
    })               
    this.setState({
      eatenFood:  eatenFood.concat(item)
    }, () => {
      this.parseEatenFood()
    })
  
   
  }

  render() {
    const { searchResult, dropdownVisible, dailyFats, 
      dailyProteins, dailyCarbs, dailyCalories, eatenFood, targetCalories, targetFats, targetCarbs, targetProtein, date } = this.state
    const { firebase } = this.props

    return (
      <Layout className="home" >
        <Container fluid="true" className="home">
          <Row className="topMainRow">
            <Row style={{width: '100%',padding: '30px 0px 40px 0px'}}>
              <Col sm="4" className="eatenCol">
                <div className="eatenDiv">
                  <span className="mediumFont">{dailyCalories.toFixed(0)}</span>
                  <p className="smallFont">kcal eaten</p>
                </div>
              </Col>
              <Col sm="4" className="circleCol">
                <p className="largeFont">remaining calories</p>
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
        <Row className="align-self-center">
            <BarChart/>
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
        <Row className="footerRow extraSmallFont">
          © Nutrition Planner - William Westerlund & Philip Rumman
        </Row>
      </Container>
    </Layout>
    )
  }
}

export default Home
