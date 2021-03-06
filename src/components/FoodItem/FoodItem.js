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
          <p style={{paddingRight: '10px'}}>kcal: {Math.round(foodObject.calories)} ({Math.round(foodObject.grams)}g)</p>
          <i className="deleteFoodIcon"><FaTrash size={20} color="#c53255" onClick={() => onClick()}/></i>
        </div>
      </div>
    )
  }