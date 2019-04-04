import React from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Col,
    Row,
    Progress,
  } from 'reactstrap'
import './carousel.css'
import asianChick from '../../images/stockphoto1.jpg'
import zenGirl from '../../images/stockphoto2.jpg'
import board from '../../images/stockphoto3.jpg'
import PieChart from '../chart'
import FoodItem from '../foodItem/foodItem';

const slides = [
    {
      src: asianChick,
      altText: 'Slide 1',
      caption: 'Daily Summary'
    },
    {
      src: board,
      altText: 'Slide 2',
      caption: 'Todays Food'
    },
    {
      src: zenGirl,
      altText: 'Slide 3',
      caption: 'Week Overview'
    }
  ]

class CarouselComponent extends React.Component {

    constructor(props) {
        super(props)

        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.goToIndex = this.goToIndex.bind(this)

        this.state = {
            activeIndex: 0,
          }
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
        const { activeIndex } = this.state
        const {dailyFats, dailyProteins, dailyCarbs, dailyCalories, eatenFood, targetCalories, targetFat, targetCarbs, targetProtein } = this.props
        return(
            <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
            <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {[
              <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={slides[0].src}>
                <img src={slides[0].src} alt={slides[0].altText}/>
                <Row className="carousel-row">
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <PieChart dailyFats={dailyFats} dailyCarbs={dailyCarbs} dailyProteins ={dailyProteins}/>
                    <div className="text-center"><p> Daily Calories </p> {Math.round((dailyCalories/targetCalories) * 1000) / 10}%</div>
                    <Progress animated color="info" value={(dailyCalories/targetCalories) * 100} />
                  </Col>
                  <Col sm="12" md={{ size: 3, offset: 0 }}>
                    <div className="text-center"><p> Daily Fats </p> {Math.round((dailyFats/targetFat) * 1000) / 10}%</div>
                    <Progress animated color="info" value={(dailyFats/targetFat)* 100} />
                    <div className="text-center"><p> Daily Carbs </p> {Math.round((dailyCarbs/targetCarbs) * 1000) / 10}%</div>
                    <Progress animated color="info" value={(dailyCarbs/targetCarbs)* 100} />
                    <div className="text-center"><p> Daily Protein </p> {Math.round((dailyProteins/targetProtein) * 1000) / 10}%</div>
                    <Progress animated color="info" value={(dailyProteins/targetProtein)* 100} />
                  </Col>
                </Row>
                <CarouselCaption  captionHeader={slides[0].caption} captionText="" />
              </CarouselItem>,

              <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={slides[1].src}>
                <img src={slides[1].src} alt={slides[1].altText} />
                <Row className="carousel-row">
                  <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <ul className="eatenFood">
                  {eatenFood.map(item => (
                    <li><a href="#"><img alt="" src={item.img} /></a></li>
                  ))
                  }
                  </ul>
                  </Col>
                </Row>
                <CarouselCaption captionHeader= {slides[1].caption} captionText="" />
              </CarouselItem>,

              <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={slides[2].src}>
                <img src={slides[2].src} alt={slides[2].altText} />
                <Row className="carousel-row">
                  
                </Row>
                <CarouselCaption captionHeader={slides[2].caption} captionText="" />
              </CarouselItem>
            ]}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        )
    }
}

export default CarouselComponent