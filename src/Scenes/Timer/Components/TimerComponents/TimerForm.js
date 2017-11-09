import React, { Component } from 'react';
import Button from '../../../../Components/Button'
import ErrorText from '../../../../Components/ErrorText'
import FlexDiv from '../../../../Components/FlexDiv'
import ComponentContainer from '../../../../Components/ComponentContainer'
import PropTypes from 'prop-types'
import '../../../../App.css';
import styled from 'styled-components'

const SubmitContainer = FlexDiv.extend`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`

const TimerInputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`

const MinutesInput = styled.input`
  height: 1em;
  font: 2em arial;
  text-align: end;
  max-width: 200px;
`

const Minutes = styled.span`
  margin-left:5px;
  font: 2em arial;
`

const TimerSubmit = Button.extend`
  flex-grow:1;
  height: 3em;
  font: 1em arial;
`

export default class TimerForm extends Component{

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    minutes: '',
    errorText: ''
  }

  handleChange = (e) => {
    this.setState({minutes: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.validateMinutes(this.state.minutes) && this.props.handleSubmit(this.state.minutes)
  }

  validateMinutes = (minutes) => {
    if(isNaN(parseInt(minutes, 10))){
      const errorText = "You must submit a number!"
      this.setState({errorText})
      return false
    }else{
      return true
    }
  }

  render(){
    return(
      <ComponentContainer>
        <ErrorText text={this.state.errorText} />
        <h1>Create a New Timer</h1>
        <TimerInputForm onSubmit={this.handleSubmit}>
          <FlexDiv>
            <MinutesInput 
              type="text" 
              value={this.state.minutes}
              onChange={this.handleChange}
            />
            <Minutes>minutes</Minutes>
          </FlexDiv>
          <SubmitContainer>
            <TimerSubmit type="submit" background="#05a905">
              Create Timer
            </TimerSubmit>
          </SubmitContainer>
        </TimerInputForm>
      </ComponentContainer>
    )
  }
}