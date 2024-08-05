import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }
  onChangeUsername = event => this.setState({username: event.target.value})
  onChangePassword = event => this.setState({password: event.target.value})
  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="userName" className="input-label">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          id="userName"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }
  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="input-label">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          id="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }
  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }
  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }
  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const respone = await fetch(loginUrl, options)
    const data = await respone.json()
    if (respone.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }
  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
          <div className="input-field-container">{this.renderUsername()}</div>
          <div className="input-field-container">{this.renderPassword()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="error-message">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
