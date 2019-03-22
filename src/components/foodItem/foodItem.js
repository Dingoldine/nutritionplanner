import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col, Button } from 'reactstrap'
import './foodItem.css'

const FoodItem = props => {
  console.log(props.photo)
  return (
    <Col md="6" lg="4" xl="3">
      <Card className="card">
        <CardImg top width={100} src={props.photo} alt="Card image cap" className="card-img" />
        <CardBody>
          <CardTitle>{props.food_name}</CardTitle>
          <CardSubtitle>{props.serving_qty}</CardSubtitle>
          <CardText>
            {props.serving_unit}
            {/*          <p>Fat: <span>{Math.round(props.nutrients.FAT * 10) / 10}g</span></p>
            <p>KCal: <span>{Math.round(props.nutrients.ENERC_KCAL * 10)/10}</span></p>
            <p>CHOCDF: <span>{Math.round(props.nutrients.CHOCDF * 10) /10}</span></p>
            <p>PRCNT <span>{Math.round(props.nutrients.PROCNT * 10) / 10}</span></p> */}
          </CardText>
          <Button>Add</Button>
        </CardBody>
      </Card>
    </Col>
  )
}
export default FoodItem
