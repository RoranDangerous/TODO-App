import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Task from './Task'

const Container = styled.div`
  margin: 2rem 0;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`


const CenterMessage = styled.p`
  text-align: center;
`

const TasksDetails = ({ tasks, onChange }) => (
  <Container>
    <HeaderContainer>
      <h2>Tasks</h2>
    </HeaderContainer>

    {tasks.map((task, index) => <Task key={`${task.message}-${index}`} {...task} onChange={onChange}/>)}

    {!tasks.length && (
      <CenterMessage>
        Add task above and it will appear in this table
      </CenterMessage>
    )}
  </Container>
)

TasksDetails.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      created_on: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func.isRequired
}

export default TasksDetails
