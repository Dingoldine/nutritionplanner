import React from 'react'
import {
Card, 
CardImg,
CardText,
CardBody,
CardTitle, 
CardSubtitle,
Col,
Button
}
from 'reactstrap';


const FoodItem = props => {
    return (
      <Col xs="3"> 
        <Card body className="text-center foodItem">
          <CardTitle>{props.label}</CardTitle>
          <CardText>  
            {props.category}              
            <p>Fat: <span>{Math.round(props.nutrients.FAT * 10) / 10}g</span></p>
            <p>KCal: <span>{Math.round(props.nutrients.ENERC_KCAL * 10)/10}</span></p>
            <p>CHOCDF: <span>{Math.round(props.nutrients.CHOCDF * 10) /10}</span></p>
            <p>PRCNT <span>{Math.round(props.nutrients.PROCNT * 10) / 10}</span></p>
          </CardText>
          <Button>Add</Button>
        </Card>
      </Col>
    );
    
  }
export default FoodItem;