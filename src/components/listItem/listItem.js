import React from 'react'
import './listItem.css'
import FoodModal from '../foodModal/foodModal'



export default ({photo, foodName, firebase, date, triggerRenderHome}) => {
    return (
      <div className="listEntry">
        <FoodModal foodName={foodName} firebase={firebase} key={foodName} date={date} triggerRenderHome={triggerRenderHome} />
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