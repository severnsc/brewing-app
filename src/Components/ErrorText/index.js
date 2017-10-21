import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

ErrorText.PropTypes = {
  text: PropTypes.string
}

ErrorText.defaultProps = {
  text: ""
}

function ErrorText(props) {

  return(
    <p className="errorText">{props.text}</p>
  )

}

export default ErrorText