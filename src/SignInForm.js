import React from 'react';
import { Link } from 'react-router-dom';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      successMessage: '',
      errors: {},
      isSubmitted: false // Track if the form is successfully submitted
    };
  }

  componentWillUnmount() {
    this.setState({
      email: '',
      password: '',
      successMessage: '',
      errors: {},
      isSubmitted: false
    });
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  };

  validateForm = () => {
    const { email, password } = this.state;
    const errors = {};
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is not valid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (this.validateForm()) {
      // Simulate a successful login (in a real app, make an API request here)
      this.setState({
        successMessage: `Welcome back, ${email}! You have logged in successfully.`,
        isSubmitted: true,
        email: '',
        password: ''
      });
    }
  };

  render() {
    const { email, password, errors, successMessage, isSubmitted } = this.state;

    if (isSubmitted) {
      // If form is submitted successfully, display success message and don't render the form
      return (
        <div className="success-message">
          <h2>{successMessage}</h2>
          <Link to="/" className="FormField__Link">
            Go to Sign Up
          </Link>
        </div>
      );
    }

    // Render the form if not submitted yet
    return (
      <form className="FormFields" onSubmit={this.handleSubmit}>
        <div className="FormField">
          <i className="fas fa-envelope" />
          <div className="Input__group">
            <input
              type="email"
              id="email"
              className="FormField__Input"
              name="email"
              required
              onChange={this.handleChange}
              value={email}
            />
            <div className="Input__line" />
            <label htmlFor="email" className="FormField__Label">
              Enter your email
            </label>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>
        <div className="FormField">
          <i className="fas fa-lock" />
          <div className="Input__group">
            <input
              type="password"
              id="password"
              className="FormField__Input"
              name="password"
              required
              value={password}
              onChange={this.handleChange}
            />
            <div className="Input__line" />
            <label htmlFor="password" className="FormField__Label">
              Enter your password
            </label>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>
        <div className="FormField">
          <button className="FormField__Button mr-20">Sign In</button>
          <Link to="/" className="FormField__Link">
            Create an account
          </Link>
        </div>
      </form>
    );
  }
}

export default SignInForm;
