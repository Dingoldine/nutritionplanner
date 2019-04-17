import React from 'react'
import CircularProgressbar from 'react-circular-progressbar'
import './circularProgress.css'

const CircularProgress = ({dailyCalories, targetCalories}) => {

    return(
        <CircularProgressbar
        percentage={(dailyCalories/targetCalories)*100}
        text={`${(Math.round(targetCalories-dailyCalories))}`}
        strokeWidth={5}
        initialAnimation
        />
    )
}

export default CircularProgress


