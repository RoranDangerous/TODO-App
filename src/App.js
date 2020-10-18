import React from 'react'
import styled from 'styled-components'
import { Alert } from '@material-ui/lab'

import useTask from './data/useTask'
import TaskInput from './TaskInput'
import TasksDetails from './TasksDetails'

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 40px auto;
`

const Header = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`

function App() {
  const { tasks, addTask, updateTask } = useTask()
  const [error, setError] = React.useState()

  const onSubmit = task => {
    const errorMsg = addTask({ message: task, created_on: (new Date()).toLocaleString() });

    setError(errorMsg)
  }

  const handleChange = (...data) => {
    const errorMsg = updateTask(...data)
    setError(errorMsg)

    return errorMsg
  }

  return (
    <Container>
      {error && <Alert severity='error'>{error}</Alert>}
      <Header>TODO List</Header>
      <TaskInput onSubmit={onSubmit} />
      <TasksDetails tasks={tasks} onChange={handleChange} />
    </Container>
  );
}

export default App;
