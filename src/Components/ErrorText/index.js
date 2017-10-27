import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

const ErrorText = (props) => {

  return(
    <p className="errorText">{props.text}</p>
  )

}

ErrorText.propTypes = {
  text: PropTypes.string
}

ErrorText.defaultProps = {
  text: ""
}

export default ErrorText