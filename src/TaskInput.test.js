import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import TaskInput from './TaskInput'

test('Adding item to the list', () => {
  const onSubmit = jest.fn()
  const { getByText } = render(<TaskInput onSubmit={onSubmit} />)

  const addButton = getByText(/add/i)
  fireEvent.submit(addButton)

  expect(onSubmit).toHaveBeenCalled()
})