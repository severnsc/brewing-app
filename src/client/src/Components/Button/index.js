import styled from 'styled-components'

export default styled.button`
  border-radius: 3px;
  border: none;
  color: white;
  background: ${props => props.background};
  cursor: pointer;
`