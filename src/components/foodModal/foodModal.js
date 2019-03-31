/* eslint-disable no-sequences */
import React from 'react'
import Popup from 'reactjs-popup'
import dateFormat from "dateformat"
import { Container, Col, Row, ListGroup, ListGroupItem, Input, InputGroup, InputGroupButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Button } from 'reactstrap'
import './foodModal.css'
import { FaChevronRight } from 'react-icons/fa'
import { makeGetNutrientsRequest } from '../../utils/api'
import FoodItem from '../foodItem/foodItem';


class FoodModal extends React.Component { // eslint-disable-line

  constructor(props) {
    super(props)
    const { foodName } = this.props

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.handleDropdownSelected = this.handleDropdownSelected.bind(this);

    this.state = {
      nutrients: [],
      foodName,
      servingSelected: true,
      servingWeightGrams: 0,
      grams: 0,
      quantity: 1,
      calories: 0,
      protein: 0,
      carbs: 0,
      sugar: 0,
      fats: 0,
      img: "",
      dropdownOpen: false,
      splitButtonOpen: false,
    }
  }

  onClick() {
    const { foodName, nutrients } = this.state
    if (nutrients.length === 0){
      makeGetNutrientsRequest(foodName)      
      .then(res => {    
        console.log(res)
        this.setState({
          nutrients: res.foods[0],
          servingWeightGrams: res.foods[0].serving_weight_grams,
          grams: res.foods[0].serving_weight_grams,
          calories: res.foods[0].nf_calories,
          protein: res.foods[0].nf_protein,
          carbs: res.foods[0].nf_total_carbohydrate,
          sugar: res.foods[0].nf_sugars,
          fats: res.foods[0].nf_total_fat,
          img: res.foods[0].photo.highres
        })
      })
      .catch(err => {
        console.log(err)
        console.log('Error in makeGetNutrientsRequest')
      })
    }
  }

  computeMacros() { // eslint-disable-line
    const { nutrients, grams, servingWeightGrams } = this.state
    this.setState({
      calories: Math.round(((nutrients.nf_calories*grams)/servingWeightGrams) * 100) / 100,
      protein: Math.round(((nutrients.nf_protein*grams)/servingWeightGrams) * 100) / 100,
      carbs: Math.round(((nutrients.nf_total_carbohydrate*grams)/servingWeightGrams) * 100) / 100,
      sugar: Math.round(((nutrients.nf_sugars*grams)/servingWeightGrams) * 100) / 100,
      fats: Math.round(((nutrients.nf_total_fat*grams)/servingWeightGrams) * 100) / 100
    })
  }

/*  3:49:52 PM UTC
      calories "4.74"
      carbs "1.42"
      fats 0
      foodName "ice tea"
      grams 474
      protein "0.00"
      sugar "0.00"  

    Perfoms entry like this  
*/
  handleAddFood() { // eslint-disable-line
    const { foodName, grams, calories, protein, carbs, sugar, fats, img} = this.state
    const { firebase, triggerRenderHome } = this.props
    const currUser = firebase.auth.currentUser

    //  for creating a document with todays date
    const date = new Date();

    const today = dateFormat(date, "isoDate", true);
    
    const time = dateFormat(date, "longTime", true); // -> "10:46:21 PM UTC etc"
    
    const foodObject = 
    {
      [time]: {
        foodName,
        grams,
        calories,
        protein, 
        carbs,
        sugar,
        fats,
        img
      }
    }

    if (currUser) {
      firebase
        .user(currUser.uid)
        .collection('consumption')
        .doc(today)
        .set(
          foodObject,
          { merge: true }
        )
        .then(() => {
          console.log('Successfully added an item')
          triggerRenderHome(foodObject)
        })
        .catch(err => {
          console.log(err)
          console.log('Failure to add a food item')
        }) 
    }
  }

  handleInputChanged = async event => {

    const { servingSelected, servingWeightGrams } = this.state
    const { value } = event.target

    this.setState({quantity: value})

    if(servingSelected) {
      this.setState({
        grams: servingWeightGrams*value
      }, () => {
        this.computeMacros()
      })
    } else {
      this.setState({
        grams: value
      }, () => {
        this.computeMacros()
      })
    } 
    
    event.preventDefault();
  }

  handleDropdownSelected(type) {

    const { quantity, servingWeightGrams } = this.state

    if (type === 'serving') {
      this.setState({
        servingSelected: true,
        grams: servingWeightGrams*quantity
      }, () => {
        this.computeMacros()
      })
    } else {
      this.setState({
        servingSelected: false,
        grams: quantity
      }, () => {
        this.computeMacros()
      })
    }
  }

  toggleDropDown() {
    const { dropdownOpen } = this.state
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  }

  toggleSplit() {
    const { splitButtonOpen } = this.state
    this.setState({
      splitButtonOpen: !splitButtonOpen
    });
  }

  render() {
    const { nutrients, foodName, servingSelected, quantity, splitButtonOpen, calories, protein, carbs, sugar, fats } = this.state
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
        <div className="row justify-content-md-center">
          {' '}
          <Col sm="4">
            <ListGroup>
              <ListGroupItem>{servingSelected ? <p>{quantity} Serving ({nutrients.serving_unit})({nutrients.serving_weight_grams}g)</p> : <p>{quantity}g</p>}</ListGroupItem>
              <ListGroupItem>Calories {calories}g</ListGroupItem>
              <ListGroupItem>Protein {protein}g</ListGroupItem>
              <ListGroupItem>Carbs {carbs}g</ListGroupItem>
              <ListGroupItem>Sugar {sugar}g</ListGroupItem>
              <ListGroupItem>Fat {fats}g</ListGroupItem>
            </ListGroup>
          </Col>

          <Col sm="4">
            <InputGroup>
              <Input value={quantity} onChange={e => { this.handleInputChanged(e) }}/>
              <InputGroupButtonDropdown addonType="prepend" isOpen={splitButtonOpen} toggle={this.toggleSplit}>
                <Button outline>{servingSelected ? <p>Serving ({nutrients.serving_weight_grams}g)</p> : <p>g</p>}</Button>
                <DropdownToggle split outline />
                <DropdownMenu>
                  <DropdownItem onClick={() => this.handleDropdownSelected('serving')}>Serving {nutrients.serving_weight_grams}g</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.handleDropdownSelected('gram')}>Gram (1g)</DropdownItem>
                </DropdownMenu>          
              </InputGroupButtonDropdown>
            </InputGroup>
          </Col>

        </div>
        </div>
        <div className="modalActions">
          <button
            className="modalButton"
            type="button"
            onClick={() => {
              this.handleAddFood()
              close()
            }}
          >
            add
          </button>
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