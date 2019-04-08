import React from 'react'
import './foodItem.css'

export default ({photo, foodName, calories, carbs, protein, fats, grams }) => {
    return (
      <div className="foodListEntry">
        <div className="food-image-wrap2">
          <img className="common-food-image2" src={photo} alt="No img"></img> 
        </div>
        <p> {foodName} </p>
        <div className="kcalDiv">
          kcal: {calories.toFixed(0)} ({grams.toFixed(0)}g)
        </div>
      </div>
    )
  }