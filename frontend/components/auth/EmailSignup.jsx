import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const EmailSignup = ({ handleChange, handleSubmit, errors, changeView }) => (
  <form className="auth-form" onSubmit={handleSubmit}>
    <div className="return-login">
      <div onClick={changeView}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <h2>Create your account</h2>
    </div>
    <p>We&apos;ll have you designing in no time.</p>

    {errors.length ? <div className="error">{errors.join('. ')}</div> : ''}

    <input type="text" name="username" placeholder="Name" onChange={handleChange('username')} />
    <input type="text" name="email" placeholder="Email" onChange={handleChange('email')} />
    <input type="password" name="password" placeholder="Password" onChange={handleChange('password')} />
    <small>
      Use 6 or more characters
    </small>
    <button type="submit" className="btn-blue">
      Get started, it&apos;s free!
    </button>
    <small>
      By signing up, you agree to Canva&apos;s&nbsp;
      <u>Terms of Use</u>
      &nbsp;and&nbsp;
      <u>Privacy Policy</u>
      .
    </small>
    <small>
      Already signed up?&nbsp;
      <Link to="/login">Log in</Link>
    </small>
  </form>
);

export default EmailSignup;
