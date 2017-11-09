import React from 'react'
import styled from 'styled-components'

export default styled.button`
  width:25px;
  height:25px;
  border-radius:50%;
  color:white;
  border:none;
  background: ${props => props.background};
`