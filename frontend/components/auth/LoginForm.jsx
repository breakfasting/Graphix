import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { googleIcon } from './AuthIcons';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      animate: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({ animate: true });
      });
    });
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleChange(form) {
    return (e) => {
      this.setState({ [form]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { action } = this.props;
    const { email, password } = this.state;
    action({ email, password });
  }

  render() {
    const { errors, demoLogin } = this.props;
    const { animate } = this.state;
    // debugger
    return (
      <form className={animate ? 'animated auth-form' : 'auth-form'} onSubmit={this.handleSubmit}>
        <div className="return-login">
          <Link to="/signup">
            <FontAwesomeIcon icon={faAngleLeft} />
          </Link>
          <h2>Log in to your account</h2>
        </div>
        <button type="button" className="google btn-outline">
          {googleIcon}
          <span>Log in with Google</span>
        </button>
        <button type="button" onClick={demoLogin} className="demo btn-outline">
          {/* {facebookIcon} */}
          <i>
            <FontAwesomeIcon icon={faUserSecret} />
          </i>
          <span>Log in as Demo User</span>
        </button>
        <div className="divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>
        {errors.length ? <div className="error">{errors.join('. ')}</div> : ''}
        <input type="text" name="email" placeholder="Email" onChange={this.handleChange('email')} />
        <input type="password" name="password" placeholder="Password" onChange={this.handleChange('password')} />
        <button type="submit" className="btn-blue">
          Log in
        </button>
        <small>
          New to Graphix?&nbsp;
          <Link to="/signup">Sign up</Link>
        </small>
      </form>
    );
  }
}

export default LoginForm;
