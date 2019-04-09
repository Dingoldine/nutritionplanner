import React from 'react'
import './foodItem.css'
import { FaTrash } from 'react-icons/fa'

export default ({foodObject, onClick }) => {
    return (
      <div className="foodListEntry">
        <div className="food-image-wrap2">
          <img className="common-food-image2" src={foodObject.img} alt="No img"></img> 
        </div>
        <p> {foodObject.foodName} </p>
        <div className="kcalDiv" style={{display: 'flex'}}>
          <p style={{paddingRight: '10px'}}>kcal: {foodObject.calories.toFixed(0)} ({foodObject.grams.toFixed(0)}g)</p>
          <FaTrash size={20} color="#c53255" onClick={() => onClick()}/>
        </div>
      </div>
    )
  }