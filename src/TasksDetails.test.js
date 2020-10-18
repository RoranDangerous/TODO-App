import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TaskDetails from './TasksDetails'
import { ExpansionPanelActions } from '@material-ui/core'

const mockTasks = [
  {
    message: 'My first task',
    created_on: '2020-05-06'
  },
  {
    message: 'Second task',
    created_on: '2020-05-07'
  }
]

test('Displays message when there is no tasks', () => {
  const { getByText } = render(
    <TaskDetails tasks={[]} onChange={() => {}}/>
  )

  const message = getByText(
    'Add task above and it will appear in this table'
  )

  expect(message).toBeInTheDocument()
})

test('Displays tasks', () => {
  const { getByText } = render(
    <TaskDetails tasks={mockTasks} onChange={() => {}} />
  )

  expect(getByText(mockTasks[0].message)).toBeInTheDocument()
  expect(getByText(mockTasks[1].message)).toBeInTheDocument()
  expect(getByText(mockTasks[0].created_on)).toBeInTheDocument()
  expect(getByText(mockTasks[1].created_on)).toBeInTheDocument()
})