import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin: 20px;
  }
`

const InputContainer = styled.div`
  margin-right: 0.5em;
  width: 100%;

  @media (max-width: 600px) {
    margin: 0;
    margin-bottom: 0.5em;
  }
`

const TaskInput = (props) => {
  const [value, setValue] = useState('')

  const onSubmit = (e) => {
    e && e.preventDefault()

    props.onSubmit(value)

    setValue('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) onSubmit(e)
  }

  return (
    <Form onSubmit={onSubmit}>
      <InputContainer>
        <TextField
          id="task-input"
          label="Task Description"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          style={{ width: '100%' }}
        />
      </InputContainer>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<AddIcon />}>
        Add
      </Button>
    </Form>
  )
}

TaskInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default TaskInput
