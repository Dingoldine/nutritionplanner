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
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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
    this.toggleCalendar = this.toggleCalendar.bind(this)
    this.handleDatepickerChange = this.handleDatepickerChange.bind(this)
    this.handleCalendarClickOutside = this.handleCalendarClickOutside.bind(this)
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
      snapshot: [],
      timelineOverviewData: new Map(),
      datepickerIsOpen: false
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

    makeGetFoodRequest(searchTerm)      
    .then(res => {
        this.setState({
          searchResult: res.common,
          dropdownVisible: true
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

  parseEatenFood() {
    const _this = this;
    return  new Promise(function(resolve, reject) {
      const { eatenFood, timelineOverviewData, date } = _this.state
      console.log(timelineOverviewData)

      let calories = 0
      let carbs = 0
      let fats = 0
      let proteins = 0
      let sugar = 0
    
      eatenFood.forEach((foodItem) => {
        calories += foodItem.calories
        carbs += foodItem.carbs
        fats += foodItem.fats
        proteins += foodItem.protein
        sugar += foodItem.sugar
      })

      const map = timelineOverviewData

      console.log("say whaat", map)

      _this.setState({
        dailyCalories: calories,
        dailyCarbs: carbs,
        dailyFats: fats,
        dailyProteins: proteins,
        dailySugars: sugar,
        timelineOverviewData: map.set(date, {"carbs": carbs, "fats": fats, "protein": proteins, "calories": calories})
      }, () => {
        console.log(_this.state)
        resolve()
      })
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
      snapshot: [],
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



  async displayConsumptionData(){
    const { snapshot, date, eatenFood } = this.state
    console.log("HELOOOOOOOOOOOOOOO")
    //  datamap is used in used to be supplied timeline overview 
    const dataMap = new Map()

    const promises = []
    snapshot.forEach(async (doc) => {
      //  add days to timelimeDataLabels
      //  only care about food eaten today
      const promise = new Promise((resolve, reject) => {
        if (doc.id === date){
          console.log("a match")

          //  add to eatenFood
          const foodList = [] 
          Object.entries(doc.data()).forEach(([timeOfDay, foodItem]) => {
            foodList.push(foodItem)
          }) 
        
         this.setState({
            eatenFood: eatenFood.concat(foodList)
          }, async function() {
            await this.parseEatenFood()
            const {dailyCarbs, dailyFats, dailyProteins, dailyCalories} = this.state;
            await dataMap.set(doc.id, {"carbs": dailyCarbs, "fats": dailyFats, "protein": dailyProteins, "calories": dailyCalories})
            resolve()
          })
        } else {  
            // extract info for timeline
            const foodList = [] 
            Object.entries(doc.data()).forEach(([timeOfDay, foodItem]) => {
                foodList.push(foodItem)
            })
            if (foodList.length !== 0) {
              let carbs = 0
              let protein = 0
              let fats = 0  
              let calories = 0

              foodList.forEach((item) => {
                  carbs += item.carbs
                  fats += item.fats
                  protein += item.protein
                  calories += item.calories
              })
              dataMap.set(doc.id, {"carbs": carbs, "fats": fats, "protein": protein, "calories": calories})
              resolve()
            }

            resolve()
        };
      })
      promises.push(promise)
    })

    Promise.all(promises).then( async () => {
      const mapAsc = await new Map([...dataMap.entries()].sort());
      this.setState({
        timelineOverviewData: mapAsc
      })

    })
}



  handleOutsideDropdownClick(e) {
    const { dropdownVisible } = this.state
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
    Object.entries(foodObject).forEach(([timeOfDay, foodItem]) => {
      item.push(foodItem)
    })               
    this.setState({
      eatenFood:  eatenFood.concat(item)
    }, () => {
      this.parseEatenFood()
    })
  }

  handleDatepickerChange (d) {
    this.setState({date: dateFormat(d, "isoDate", true)})
    this.toggleCalendar()
  }

  toggleCalendar (e) {
    const {datepickerIsOpen} = this.state
    e && e.preventDefault()
    this.setState({datepickerIsOpen: !datepickerIsOpen})
  }

  handleCalendarClickOutside(){
    const {datepickerIsOpen} = this.state
    this.setState({datepickerIsOpen: !datepickerIsOpen})
  }

  render() {
    const { searchResult, dropdownVisible, dailyFats, 
      dailyProteins, dailyCarbs, dailyCalories, eatenFood, 
      targetCalories, targetFats, targetCarbs, targetProtein,
      datepickerIsOpen, date, timelineOverviewData } = this.state
    const { firebase } = this.props

    return (
      <Layout className="home" >
        <Container fluid="true" className="home">
          <Row className="topMainRow">
            <Row style={{width: '100%',padding: '30px 0px 40px 0px'}}>
              <Col md={{ size: 2, offset: 2 } } className="eatenCol">
                <div className="eatenDiv">
                  <span className="mediumFont">{dailyCalories.toFixed(0)}</span>
                  <p className="smallFont capitalize">kcal eaten</p>
                </div>
              </Col>
              <Col md={{ size: 4 } }  className="circleCol">
                <p className="largeFont">remaining calories</p>
                <CircularProgress dailyCalories={dailyCalories} targetCalories={targetCalories} />
              </Col>   
            </Row>
            <Row style={{width: '100%'}}>
              <Col md="3"></Col> 
              <Col md="6" style={{ display: 'flex', justifyContent: 'center'}}>
                <Col md="4" style={{ display: 'flex', justifyContent: 'center'}}>
                  <MacroProgressBar name="carbs" daily={dailyCarbs} target={targetCarbs} />
                </Col> 
                <Col md="4" style={{ display: 'flex', justifyContent: 'center'}}>
                  <MacroProgressBar name="protein" daily={dailyProteins} target={targetProtein} />
                </Col> 
                <Col md="4" style={{ display: 'flex', justifyContent: 'center'}}>
                  <MacroProgressBar name="fats" daily={dailyFats} target={targetFats} />
                </Col> 
              </Col> 
              <Col md="3"></Col> 
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
                    className="smallFont"
                  />
                  <InputGroupAddon addonType="prepend">
                    <Button className="searchButton smallFont" type="submit">Search</Button>
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
                        date={date}
                        triggerRenderHome = {this.triggerRenderHome}
                      />
                    ))}
                  </ul>
                </div>
                )}
              </Form>
            </Col>
          </Row>
          <Row className="align-self-center" className="datetimeRow">   
          <Col sm="12" md={{ size: 4, offset: 4 } } className="text-center">  
            <div className="date-picker smallFont">
              <a data-slide="prev" role="button" className="left date-control" 
                onClick={() => {
                  var d = new Date(date);
                  d.setDate(d.getDate() - 1);
                  this.setState({
                    date: dateFormat(d, "isoDate", true)
                  }, () => {this.fetchAndDisplay()})
                }
              }>
                <i><FaChevronLeft/></i>
              </a>        
              <TransitionGroup style={{position: "relative", display: "inline-block", width: "200px"}}>
                <CSSTransition
                  key={date}
                  timeout={1000}
                  classNames="messageout"
                  >
                  <div className="date-container">
                    <p id="current-date-shown">{date}</p>
                  </div>
                
                </CSSTransition>
              </TransitionGroup>
              <a data-slide="next" role="button" className="right date-control" 
                onClick={() => {
                  const d = new Date(date).getTime() + 86400000;
                  this.setState({
                    date: dateFormat(d, "isoDate", true)
                  }, () => {this.fetchAndDisplay()})
              }}><i><FaChevronRight/></i></a>
              </div>
              <div>
                <button type="button" className="btn openCalendarButton" onClick={this.toggleCalendar}>  
                    <i className="fas calendar"><FaCalendarAlt/></i>
                </button> 
                {
                  datepickerIsOpen && (
                      <DatePicker
                          selected={new Date(date)}
                          onChange={this.handleDatepickerChange}
                          onClickOutside={this.handleCalendarClickOutside}
                          withPortal
                          inline />
                  )
                }
            </div>
          </Col>
        </Row>
        <Row className="align-self-center">
            <BarChart timelineOverviewData={timelineOverviewData} date={date} dailyCarbs={dailyCarbs} dailyFats={dailyFats} dailyProteins={dailyProteins} />
        </Row>
        <Row className="foodListRow">
        <Col sm="6" style={{ textAlign: 'center' }} className="eatenFoodListCol">
          <div className="changeSettingsDiv  mediumFont">Meals {date}</div>
            {
              eatenFood.length !== 0 ? (
                <div className="foodListWrapper smallFont">
                  { eatenFood.map((foodObject,index) => (
                    <FoodItem
                      foodObject={foodObject}
                      onClick={() => this.handleDeleteFoodItem(foodObject, index)}
                    />
                  ))}
                </div>
                ) : (
                  <div className="smallFont">nothing to show here</div>
                  )
              }
        </Col>
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
