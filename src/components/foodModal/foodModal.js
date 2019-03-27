/* eslint-disable no-sequences */
import React from 'react'
import Popup from 'reactjs-popup'
import { Container, Col, Row, ListGroup, ListGroupItem, Input, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Button } from 'reactstrap'
import './foodModal.css'
import { FaChevronRight } from 'react-icons/fa'
import { makeGetNutrientsRequest } from '../../utils/api'

class FoodModal extends React.Component { // eslint-disable-line

  constructor(props) {
    super(props)
    const { foodName } = this.props

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);

    this.state = {
      nutrients: [],
      foodName,
      servingSelected: true,
      quantity: 1,
      dropdownOpen: false,
      splitButtonOpen: false,
    }
  }

  onClick() {
    const { foodName } = this.state
    console.log(foodName)
    if (this.state.nutrients.length === 0){
      makeGetNutrientsRequest(foodName)      
      .then(res => {    
        this.setState({
          nutrients: res.foods[0],
        })
      })
      .catch(err => {
        console.log(err)
        console.log('Error in makeGetNutrientsRequest')
      })
    }
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  render() {
    const { nutrients, foodName } = this.state
    
    
    return(
      <Popup
      trigger={<div className="openModal"><div className="icon-container"><FaChevronRight /><FaChevronRight /></div></div>}
      modal
      closeOnDocumentClick
      >
      {close => (
      // Now we can make an api call from Home.js
      this.onClick(),
      <div className="reactjs-modal">
        <a className="modalClose" onClick={close}> 
          &times;
        </a>
        <div className="modalHeader"> {foodName} </div>
        <div className="modalContent">
          {' '}
          {console.log(nutrients)}
          <Col sm="5">
            <ListGroup>
              <ListGroupItem>{this.state.servingSelected ? <p>{this.state.quantity} Serving ({nutrients.serving_unit})({nutrients.serving_weight_grams}g)</p> : <p>{this.state.quantity}g</p>}</ListGroupItem>
              <ListGroupItem>Total Calories {nutrients.nf_calories}g</ListGroupItem>
              <ListGroupItem>Protein {nutrients.nf_protein}g</ListGroupItem>
              <ListGroupItem>Carbs {nutrients.nf_total_carbohydrate}g</ListGroupItem>
              <ListGroupItem>Sugar {nutrients.nf_sugars}g</ListGroupItem>
              <ListGroupItem>Fat {nutrients.nf_total_fat}g</ListGroupItem>
            </ListGroup>
          </Col>

          <Col sm="5">
            <InputGroup>
              <Input value={this.state.quantity} onChange={e => { this.setState({quantity: e.target.value})}} />
              <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                <Button outline>{this.state.servingSelected ? <p>Serving ({nutrients.serving_weight_grams}g)</p> : <p>g</p>}</Button>
                <DropdownToggle split outline />
                <DropdownMenu>
                  <DropdownItem onClick={() => {this.setState({servingSelected: true})}}>Serving {nutrients.serving_weight_grams}g</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {this.setState({servingSelected: false})}}>Gram (1g)</DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </InputGroup>
          </Col>

        </div>
        <div className="modalActions">
          <Popup
            trigger={<button className="modalButton"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="modalButton"
            type="button"
            onClick={() => {
              console.log('modal closed ')
              close()
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
    )
  }
} 

export default FoodModal