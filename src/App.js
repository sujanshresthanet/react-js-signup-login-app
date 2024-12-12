import React from 'react';
import './App.css';  // Ensure this path matches the location of your App.css file
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'; // Use Routes here
import SignInForm from './SignInForm';  // Assuming SignInForm is in the same folder
import SignUpForm from './SignUpForm';  // Assuming SignUpForm is in the same folder
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Update to use CSSTransition and TransitionGroup

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <TransitionGroup>
            <CSSTransition
              key={window.location.pathname} // This ensures that each path transition gets a unique key
              timeout={300}
              classNames="fadein" // Replace with your own animation class
              unmountOnExit
            >
              <div className="App__Form">
                <div className="PageArrow">
                  <NavLink to="/sign-in" className="PageArrow__Item">
                    <i className="fas fa-angle-left" />
                  </NavLink>
                  <NavLink exact to="/" className="PageArrow__Item">
                    <i className="fas fa-angle-right" />
                  </NavLink>
                </div>
                <div className="FormTitle">
                  <NavLink
                    to="/sign-in"
                    activeClassName="FormTitle__Link--Active"
                    className="FormTitle__Link"
                  >
                    Sign In
                  </NavLink>
                  or{" "}
                  <NavLink
                    exact
                    to="/"
                    activeClassName="FormTitle__Link--Active"
                    className="FormTitle__Link"
                  >
                    Sign Up
                  </NavLink>
                </div>

                {/* Wrap Routes in a <Routes> component */}
                <Routes>
                  <Route path="/" element={<SignUpForm />} />
                  <Route path="/sign-in" element={<SignInForm />} />
                </Routes>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </HashRouter>
    );
  }
}

export default App;
