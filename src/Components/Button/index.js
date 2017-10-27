import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Button = (props) => {
    
    const buttonStyle = {
      backgroundColor: props.backgroundColor
    }

    return(
      <button className={props.className} id={props.id} style={buttonStyle} onClick={props.onClick}>
        {props.buttonText}
      </button>
    )

}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string
}

Button.defaultProps = {
  buttonText: ''
}

export default Button