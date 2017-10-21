import React from 'react'
import './style.css'

const Button = (props) => {
    
    const buttonStyle = {
      backgroundColor: props.backgroundColor
    }

    return(
      <button id={props.id} style={buttonStyle} onClick={props.onClick}>{props.buttonText}</button>
    )

}

export default Button