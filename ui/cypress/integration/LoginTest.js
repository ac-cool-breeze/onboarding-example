import { ClickAwayListener } from '@material-ui/core';
import '@testing-library/cypress/add-commands';

describe('Login', () => {
  beforeEach(() => {
    cy.visit(`localhost:3000`)
  })

  it('Can accept input for username', () => {
    cy.get('#username').type('newUser')
  });

  it('Can accept input for password', () => {
    cy.get('#password').type('secret')
    cy.findByText('secret').should('not.exist')
  });

});