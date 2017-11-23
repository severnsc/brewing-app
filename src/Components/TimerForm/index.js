import ErrorText from '../ErrorText'
import FlexDiv from '../FlexDiv'
import styled from 'styled-components'
import PropTypes from 'prop-types'

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

const SubmitContainer = FlexDiv.extend`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`

const TimerSubmit = Button.extend`
  flex-grow:1;
  height: 3em;
  font: 1em arial;
`

const TimerForm = ({errorText, createTimer}) => {

  let minutesInput

  return(
    <div>
      <ErrorText>
        {errorText}
      </ErrorText>
      <h1>Create New Timer</h1>
      <TimerInputForm 
        onSubmit={createTimer(parseInt(minutesinput.value, 10))}
      >
        <FlexDiv>
          <MinutesInput 
            type="text"
            ref={input => minutesinput = input}
          />
          <Minutes>minutes</Minutes>
        </FlexDiv>
        <SubmitContainer>
          <TimerSubmit type="submit" background="#05a905">
            Create Timer
          </TimerSubmit>
        </SubmitContainer>
      </TimerInputForm>
    </div>
  )

}

TimerForm.propTypes = {
  errorText: PropTypes.string.isRequired,
  createTimer: PropTypes.func.isRequired
}

export default TimerForm