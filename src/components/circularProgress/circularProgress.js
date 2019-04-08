import React from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import './circularProgress.css'

const CircularProgress = ({dailyCalories, targetCalories}) => {

    return(
        <CircularProgressbar
        percentage={(dailyCalories/targetCalories)*100}
        text={`${(targetCalories-dailyCalories).toFixed(0)}`}
        strokeWidth={5}
        initialAnimation
        />
    )
}

export default CircularProgress


