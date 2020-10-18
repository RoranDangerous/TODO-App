import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App renders successfully', () => {
  const { getByText } = render(<App />);
  const header = getByText(/todo list/i);
  expect(header).toBeInTheDocument();
});
