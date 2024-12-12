import React from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      hasAgreed: false,
      successMessage: '', // To store success message
      errors: {}, // For form validation errors
      isSubmitted: false // Track if the form is successfully submitted
    };
  }

  componentWillUnmount() {
    this.setState({
      email: '',
      password: '',
      name: '',
      hasAgreed: false,
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
    const { email, password, name, hasAgreed } = this.state;
    const errors = {};
    let isValid = true;

    // Simple validation rules
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
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!hasAgreed) {
      errors.hasAgreed = 'You must agree to the terms of service';
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = this.state;

    if (this.validateForm()) {
      // Simulate a successful sign-up (in a real app, make an API request here)
      this.setState({
        successMessage: `Welcome, ${name}! You have signed up successfully.`,
        isSubmitted: true,
        email: '',
        password: '',
        name: '',
        hasAgreed: false
      });
    }
  };

  render() {
    const { email, password, name, hasAgreed, errors, successMessage, isSubmitted } = this.state;

    if (isSubmitted) {
      // If form is submitted successfully, display success message and don't render the form
      return (
        <div className="success-message">
          <h2>{successMessage}</h2>
          <Link to="/sign-in" className="FormField__Link">
            Go to Sign In
          </Link>
        </div>
      );
    }

    // Render the form if not submitted yet
    return (
      <form className="FormFields" onSubmit={this.handleSubmit}>
        <div className="FormField">
          <i className="fas fa-user" />
          <div className="Input__group">
            <input
              type="text"
              id="SignUpName"
              className="FormField__Input"
              name="name"
              required
              onChange={this.handleChange}
              value={name}
            />
            <div className="Input__line" />
            <label htmlFor="SignUpName" className="FormField__Label">
              Enter your full name
            </label>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
        </div>
        <div className="FormField">
          <i className="fas fa-lock" />
          <div className="Input__group">
            <input
              type="password"
              id="SignUpPassword"
              className="FormField__Input"
              name="password"
              required
              onChange={this.handleChange}
              value={password}
            />
            <label htmlFor="SignUpPassword" className="FormField__Label">
              Enter your password
            </label>
            <div className="Input__line" />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>
        <div className="FormField">
          <i className="fas fa-envelope" />
          <div className="Input__group">
            <input
              type="email"
              id="SignUpEmail"
              className="FormField__Input"
              name="email"
              required
              onChange={this.handleChange}
              value={email}
            />
            <label htmlFor="SignUpEmail" className="FormField__Label">
              Enter your email
            </label>
            <div className="Input__line" />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>
        <div className="FormField">
          <label htmlFor="" className="FormField__CheckboxLabel">
            <input
              type="checkbox"
              className="FormField__Checkbox"
              name="hasAgreed"
              onChange={this.handleChange}
              checked={hasAgreed}
            />
            I agree to the{' '}
            <a href="#" className="FormField__TermsLink">
              terms of service
            </a>
          </label>
          {errors.hasAgreed && <p className="error-message">{errors.hasAgreed}</p>}
        </div>
        <div className="FormField">
          <button className="FormField__Button mr-20">Sign Up</button>
          <Link to="/sign-in" className="FormField__Link">
            I'm already a member
          </Link>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
