import React from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import './circularProgress.css'

const CircularProgress = ({dailyCalories, targetCalories}) => {
    let remaining = targetCalories - dailyCalories;
    const percentage = (dailyCalories/targetCalories)*100;
    if (remaining < 0) {
        remaining = 0
    }
    return(
        <CircularProgressbar
        percentage={percentage}
        text={`${(Math.round(remaining))}`}
        strokeWidth={5}
        initialAnimation
        />
    )
}

export default CircularProgress


