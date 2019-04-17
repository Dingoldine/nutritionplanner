import React from 'react'
import Slider from '@material-ui/lab/Slider'
import './slider.css'

export const MacroSlider = ({ label, onChange, value, min, max, kcal }) => {
  return (
    <div className="macroDiv smallFont">
      <span className="boldText">{label} {Math.round(value)}g</span> &nbsp; {Math.round(value) * kcal} kcal
      <Slider
        classes={{ container: "slider" }}
        value={value}
        aria-labelledby="label"
        onChange={onChange}
        min={min}
        max={max}
      />
    </div>
  )
}

export default MacroSlider
