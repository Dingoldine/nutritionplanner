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
      dailySugars: 0
    }

    this.node = React.createRef()

  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleDropdownClick, false)
  }

  componentDidMount(){
    const { firebase } = this.props
    const currUser = firebase.auth.currentUser
    const { dailyCalories } = this.state  
    
    //  store this for later use inside db fetch
    var _this = this;
    //  for creating a document with todays date
    const date = new Date();

    const today = dateFormat(date, "isoDate", true);

    firebase
    .user(currUser.uid)
    .collection('consumption')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          if (doc.id === today){
            console.log("a match")
            console.log(doc.data())
            const objectKeys = Object.keys(doc.data());
            console.log("objectKeys: ", objectKeys)

            let calories = 0
            let carbs = 0
            let fats = 0
            let proteins = 0
            let sugar = 0
            Object.entries(doc.data()).forEach(([key, value]) => {
              console.log()
              console.log(`key= ${key} value = ${value}`)
              
              
              // eslint-disable-next-line no-restricted-syntax
              // eslint-disable-next-line guard-for-in
              // eslint-disable-next-line prefer-const
              for (let property in value) {
                console.log(`key = ${property} value = ${value[property]}`)
                
                switch(property) {
                  case "calories":
                    calories += parseFloat(value[property])
                    break;
                  // eslint-disable-next-line no-undef
                  case "carbs":
                    carbs += parseFloat(value[property])
                    break;
                  case "fats":
                    fats += parseFloat(value[property])
                    break;
                  case "protein":
                    proteins += parseFloat(value[property])
                    break;
                  case "sugar":
                    sugar += parseFloat(value[property])
                    break;
                  default:
                    // code block
                } 
             }
            })

            console.log("")
            _this.setState({
              dailyCalories: calories,
              dailyCarbs: carbs,
              dailyFats: fats,
              dailyProteins: proteins,
              dailySugars: sugar
            }, () => {
              console.log(_this.state);
          });

          }
            
      });
      
  
    })
    .catch(err => {
      console.log(err)
      console.log('Failure to fetch an item')
    }) 
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

  render() {
    const { searchResult, dropdownVisible, dailyFats, dailyProteins, dailyCarbs } = this.state
    const { firebase } = this.props
    return (
      <Layout className="home" >
        <Container fluid="true" className="home">
          <Carousel dailyFats={dailyFats} dailyCarbs={dailyCarbs} dailyProteins ={dailyProteins}/>
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
