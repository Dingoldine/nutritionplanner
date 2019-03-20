import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: 300,
    margin: '0 auto',
  },
  slider: {
    padding: '22px 0px',
  },
};

export const MacroSlider = ({ classes, label, onChange, value, min, max, kcal }) => {
    return (
        <div className={classes.root} style={{fontSize: 14}}>
            {label} {parseFloat(value).toFixed(0)}g &nbsp; {parseFloat(value).toFixed(0) * kcal} kcal
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


export default withStyles(styles)(MacroSlider);