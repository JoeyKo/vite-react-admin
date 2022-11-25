import React from 'react'
import renderer from 'react-test-renderer'
import App from '../App'

test('simple render', () => {
  renderer.create(<App />)
})
