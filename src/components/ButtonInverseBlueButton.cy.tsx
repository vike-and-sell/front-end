import React from 'react'
import { InverseBlueButton } from './Button'

describe('<InverseBlueButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InverseBlueButton />)
  })
})