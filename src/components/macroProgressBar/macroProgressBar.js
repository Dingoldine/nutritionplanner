import React from 'react'
import { Progress } from 'reactstrap' 
import './macroProgressBar.css'

const MacroProgressBar = ({name, target, daily}) => {
    return(
        <div>
            <div className="text-center large-text macro-text"><p> {name} </p></div>
            <Progress animated value={(daily/target) * 100} />
            <div className="text-center macro-text"><p> {(target - daily).toFixed(0)} g remaining </p></div>
        </div>
    )
}

export default MacroProgressBar