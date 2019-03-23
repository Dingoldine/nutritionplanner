import React, { Component } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Col,
  Row,
  Progress,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Form
} from 'reactstrap'
import PieChart from '../../components/chart'
import Layout from '../../components/layout'
import FoodItem from '../../components/foodItem/foodItem'
import { makeGetNutritionRequest } from '../../utils/api'
import './Home.css'
import asianChick from '../../images/stockphoto1.jpg'
import zenGirl from '../../images/stockphoto2.jpg'

const slides = [
  {
    src: asianChick,
    altText: 'Slide 1',
    caption: 'Daily Summary'
  },
  {
    src: zenGirl,
    altText: 'Slide 2',
    caption: 'Week Overview'
  },
  {
    src:
      'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Whatever'
  }
]

const ListItem = props => {
  console.log(props.photo)
  return (
    <li>
      <a href="" className="item-link">
        <div className = "food-Item-container"> 
          <div className="food-image-wrap">
            <img className="common-food-image" src={props.photo} alt="No img"></img> 
          </div>
          <p> {props.food_name}</p>
        </div>
      </a>
    </li>
  )
}
class Home extends Component {
  // eslint-disable-line

  constructor(props) {
    // eslint-disable-line
    super(props)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
    this.goToIndex = this.goToIndex.bind(this)
    this.onExiting = this.onExiting.bind(this)
    this.onExited = this.onExited.bind(this)

    this.state = {
      searchTerm: '',
      searchResult: [],
      activeIndex: 0,
      isLoading: false,
      hasErrored: false,
      searchSuggestions: []
    }
  }

  onExiting() {
    this.animating = true
  }

  onExited() {
    this.animating = false
  }

  onSearch(e) { //eslint-disable-line
    e.preventDefault()
  }

  handleChange = async event => {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value
    const { name } = target

    makeGetNutritionRequest(value)      
    .then(res => {
        this.setState({
          [name]: value,
          searchResult: res.common
        })
      })
      .catch(err => {
        console.log(err)
        console.log('Error in handleChange')
      })
  }

  next() {
    if (this.animating) return
    const { activeIndex } = this.state
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1
    this.setState({ activeIndex: nextIndex })
  }

  previous() {
    if (this.animating) return
    const { activeIndex } = this.state
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1
    this.setState({ activeIndex: nextIndex })
  }

  goToIndex(newIndex) {
    if (this.animating) return
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex, searchResult, isLoading } = this.state
    console.log(this.state)

    //  Currently re-renders Search results every time the slide moves, not so good, must break the carousel that keeps updating state?
    return (
      <Layout className="home">
        <Container className="home" fluid="true">
          {/*Carousel Slider*/}
          <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
            <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {[
              <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={slides[0].src}>
                <img src={slides[0].src} alt={slides[0].altText} />
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <PieChart />
                </Col>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <p> Daily Calories </p>
                  <Progress animated color="info" value={50} />
                </Col>
                <CarouselCaption captionText={slides[0].caption} captionHeader={slides[0].caption} />
              </CarouselItem>,

              <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={slides[1].src}>
                <img src={slides[1].src} alt={slides[1].altText} />
                <CarouselCaption captionText={slides[1].caption} captionHeader={slides[1].caption} />
              </CarouselItem>,

              <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={slides[2].src}>
                <img src={slides[2].src} alt={slides[2].altText} />
                <CarouselCaption captionText={slides[2].caption} captionHeader={slides[2].caption} />
              </CarouselItem>
            ]}

            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
          {/*Search field and button*/}
          <Row className="search">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form className="form" onSubmit={e => this.onSearch(e)}>
                <InputGroup>
                  <Input
                    placeholder="Find a food"
                    onChange={e => { this.handleChange(e)}}
                    name="searchTerm"
                  />
                  <InputGroupAddon addonType="prepend">
                    <Button type="submit">Search</Button>
                  </InputGroupAddon>
                </InputGroup>
                <ul className ="dropdown-list">
                {searchResult.map(item => (
                  <ListItem
                    food_name={item.food_name}
                    serving_unit={item.serving_unit}
                    serving_qty={item.serving_qty}
                    photo={item.photo.thumb}
                  />
                ))}
              </ul>
              </Form>
            </Col>
          </Row>

          {/*            
            <Row className="cards">
                {searchResult.map(item => <FoodItem food_name = {item.food_name} serving_unit = {item.serving_unit} serving_qty = {item.serving_qty} photo = {item.photo.thumb} /> )}
            </Row> */}
        </Container>
      </Layout>
    )
  }
}

export default Home
