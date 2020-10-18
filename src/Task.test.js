import React from 'react'
import { mount } from 'enzyme'
import { render } from '@testing-library/react'

import Task from './Task'

const mockTask = {
  message: 'Test task message',
  created_on: '2020-02-20',
  completed: true
}

test('Displays task message', () => {
  const { getByText } = render(
    <Task {...mockTask} onChange={() => {}}/>
  )

  expect(getByText(mockTask.message)).toBeInTheDocument()
  expect(getByText(mockTask.created_on)).toBeInTheDocument()
})

test('Displays styles correctly', () => {
  const { getByText } = render(
    <Task { ...mockTask} onChange={() => {}} />
  )

  const message = getByText(mockTask.message)
  expect(message).toBeInTheDocument()
  expect(message.style['text-decoration']).toBe('line-through')
})

test('Clicking on the completed icon updated completed calls onChange', () => {
  const onChange = jest.fn()
  const component = mount(
    <Task { ...mockTask} onChange={onChange} />
  )
  expect(component).toMatchSnapshot();

  const completedIcon = component.find('svg.MuiSvgIcon-root').first()
  completedIcon.simulate('click')

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(mockTask.message, { completed: false })
})

test('Task message editing', () => {
  const onChange = jest.fn()
  const component = mount(
    <Task { ...mockTask} onChange={onChange} />
  )
  expect(component).toMatchSnapshot();

  const editIcon = component.find('svg.MuiSvgIcon-root').last()
  editIcon.simulate('click')

  const inputComponent = component.find('input')
  const new_message = 'Hello new task'
  inputComponent.simulate('change', { target: { value: new_message }})
  inputComponent.simulate('keydown', { keyCode: 13})

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(mockTask.message, { message: new_message })
})