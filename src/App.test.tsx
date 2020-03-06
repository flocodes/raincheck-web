import React from 'react'
import { render } from '@testing-library/react'
import App from './components/App'

test('app renders at all', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText('Raincheck')
  expect(linkElement).toBeInTheDocument()
})

