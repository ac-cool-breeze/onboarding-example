import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import '@testing-library/jest-dom/extend-expect';
import CreateRole from './Components/CreateRole/CreateRole'

import AssignTaskGroup from './Components/AssignTaskGroup/AssignTaskGroup'


// xit('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


describe('Login', () => {

  it('should render the Login component', () => {
    render(<Login />)
    expect(screen.getByText('Login to our website')).toBeInTheDocument()
  })

  it('should update password input', () => {
    render(<Login />)
    let passwordField = screen.getByTestId('password')
    userEvent.type(passwordField, 'apassword')
    expect(passwordField).toHaveValue('apassword')
  })

  it('should update username input', () => {
    render(<Login />)
    let usernameField = screen.getByTestId('username')
    userEvent.type(usernameField, 'newuser')
    expect(usernameField).toHaveValue('newuser')
  })

  // it('should show login on first visit', () => {
  //   render(<App />)
  //   expect( screen.getByText('Login to our website')).toBeInTheDocument()
  // })

})  // End of Login Test Section



describe('Home', () => {

  // it('should show at least My Account route', () => {
  //   render(<Home />)


  // })

  // it('should show Logout route', () => {
  //   render(<Home />)

  // })

})  // End of Home Test Section

describe('Create Tasks', () => {


})  // End of Create Task Test Section

describe('Create Role', () => {

  it('Should have a create role form', ()=>{
    render(<CreateRole />)
    expect( screen.getByTestId('createTaskForm')).toBeInTheDocument()
  })

}) // End of Create Role Test Section
