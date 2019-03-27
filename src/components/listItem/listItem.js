import React from 'react'
import './listItem.css'
import FoodModal from '../foodModal/foodModal'



export default ({photo, foodName }) => {
    return (
      <div className="listEntry">
        <FoodModal foodName={foodName} />
        <li>
            <div className = "food-item-container"> 
              <div className="food-image-wrap">
                <img className="common-food-image" src={photo} alt="No img"></img> 
              </div>
              <p> {foodName} </p>
            </div>
        </li>
      </div>
    )
  }