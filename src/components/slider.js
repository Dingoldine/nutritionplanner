import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/lab/Slider'

const styles = {
  root: {
    width: 300,
    margin: '0 auto'
  },
  slider: {
    padding: '22px 0px'
  },
  boldText: {
    fontWeight: '500',
    fontSize: '15px'
  }
}

export const MacroSlider = ({ classes, label, onChange, value, min, max, kcal }) => {
  return (
    <div className={classes.root} style={{ fontSize: 14 }}>
      <span className={classes.boldText}>{label} {parseFloat(value).toFixed(0)}g</span> &nbsp; {parseFloat(value).toFixed(0) * kcal} kcal
      <Slider
        classes={{ container: classes.slider }}
        value={value}
        aria-labelledby="label"
        onChange={onChange}
        min={min}
        max={max}
      />
    </div>
  )
}

export default withStyles(styles)(MacroSlider)
