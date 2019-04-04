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
import Carousel from '../../components/carousel/carousel'
import Layout from '../../components/layout'
import ListItem from '../../components/listItem/listItem'
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
    // this.handleModalClose = this.handleModalClose.bind(this);
  

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
      targetFat: 0,
      eatenFood: [],  
    }

    this.node = React.createRef()

  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleDropdownClick, false)
  }

  componentDidMount(){
    const { firebase, history } = this.props
    //  store this for later use inside db fetch
    var _this = this;
    //  for creating a document with todays date
    const date = new Date();

    const today = dateFormat(date, "isoDate", true);
    
    //if user is logged in, sanity check 
    firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        firebase
        .user(user.uid)
        .collection('consumption')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());

              //  only care about food eaten today for now
              if (doc.id === today){
                console.log("a match")
                console.log(doc.data())                
                _this.parseFoodItems(doc.data())
              }           
          });
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
          targetFat: snapshot.data().settings.fat,
          })
        })
      } else {
        // No user is signed in.
        history.push('/')
      }
    });

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

  parseFoodItems(foodObject){
    const {dailyCalories, dailyFats, dailyProteins, dailySugars, dailyCarbs, eatenFood} = this.state
    const objectKeys = Object.keys(foodObject);
    console.log("objectKeys: ", objectKeys)
    let calories = 0
    let carbs = 0
    let fats = 0
    let proteins = 0
    let sugar = 0
    const foodData = []
    Object.entries(foodObject).forEach(([key, value]) => {
      console.log()
      console.log(`key= ${key} value = ${value}`)
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line guard-for-in
      // eslint-disable-next-line prefer-const
      foodData.push(value)
      for (const property in value) {
        console.log(`key = ${property} value = ${value[property]}`)
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
    console.log("back in home baby")
    console.log(foodObject)
    this.parseFoodItems(foodObject)

  }

  render() {
    const { searchResult, dropdownVisible, dailyFats, dailyProteins, dailyCarbs, dailyCalories, eatenFood, targetCalories, targetFat, targetCarbs, targetProtein } = this.state
    const { firebase } = this.props
    return (
      <Layout className="home" >
        <Container fluid="true" className="home">
          <Carousel 
          dailyFats={dailyFats} 
          dailyCarbs={dailyCarbs} 
          dailyProteins ={dailyProteins} 
          dailyCalories={dailyCalories}
          targetCalories={targetCalories}
          targetProtein={targetProtein}
          targetFat={targetFat}
          targetCarbs={targetCarbs} 
          eatenFood={eatenFood}/>
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
        </Container>
      </Layout>
    )
  }
}

export default Home
