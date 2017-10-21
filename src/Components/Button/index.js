import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

Button.PropTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string
}

Button.defaultProps = {
  buttonText: ''
}

function Button(props) {
    
    const buttonStyle = {
      backgroundColor: props.backgroundColor
    }

    return(
      <button className={props.className} id={props.id} style={buttonStyle} onClick={props.onClick}>
        {props.buttonText}
      </button>
    )

}

export default Button