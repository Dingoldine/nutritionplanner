import React from 'react'
import './listItem.css'
import FoodModal from '../foodModal/foodModal'

export default ({photo, foodName}) => {
    return (
      <li>
        <a href="" className="item-link">
          <div className = "food-item-container"> 
            <div className="food-image-wrap">
              <img className="common-food-image" src={photo} alt="No img"></img> 
            </div>
            <p> {foodName} <FoodModal foodName={foodName}/></p>
          </div>
        </a>
      </li>
    )
  }