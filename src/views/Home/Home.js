import React, { Component } from 'react';
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
} from 'reactstrap';
import {
  API
} from '../../app/apikey'

import PieChart from '../../components/chart'
import Layout from '../../components/layout'
import './Home.css'



const items = [
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Daily Summary'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Week Overview'
  },
  {
    src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Whatever'
  }
];

class Home extends Component { // eslint-disable-line
  
  constructor(props) { // eslint-disable-line
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.state = {
      searchTerm: '',
      searchResult: [],
      activeIndex: 0,
      isLoading: false,
      hasErrored: false
    }

  }

  // eslint-disable-next-line react/sort-comp
  fetchFood(searchTerm) {
      this.setState({ isLoading: true });
      const ingredients = encodeURIComponent(searchTerm);
      
      fetch(`https://api.edamam.com/api/food-database/parser?ingr=${ingredients}&app_id=${API.appID}&app_key=${API.key}`)
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }

              this.setState({ isLoading: false });

              return response;
          })
          .then((response) => response.json())
          .then((searchResult) => {
            console.log(searchResult.parsed)

            const matchedFood = searchResult.parsed.map((item) => {
              return item.food.label
            })

            //  search hints
            console.log(searchResult.hints)
          
            this.setState({ searchResult: matchedFood } )
          })

          .catch(() => this.setState({ hasErrored: true }));
    }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(value)
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  onSearch(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.fetchFood(searchTerm)
  }

  render () {
    const { activeIndex, searchResult, isLoading, searchTerm } = this.state;
    console.log(this.state)
    
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });


    return (
      <Layout className="home">
        <Container className="home" fluid="true">
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            {searchResult.map(item => <p> {item} </p> )}
            <Progress animated color="info" value={50} />
            <PieChart />
          </Col>
            {/*Search field and button*/}
          <Row className="search">
            <Col  sm="12" md={{ size: 6, offset: 3 }}>
            <Form className="form" onSubmit={ (e) => this.onSearch(e) } >
                <InputGroup>
                    <Input 
                      placeholder="Find a food"
                      onChange={ (e) => {
                        this.handleChange(e)
                      } }
                      name="searchTerm"

                    />
                    <InputGroupAddon addonType="prepend">
                      <Button type="submit">
                        Search
                      </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
                    
            </Col>
          </Row>
        </Container>
      </Layout>
      
    );
  }
}

export default Home;  