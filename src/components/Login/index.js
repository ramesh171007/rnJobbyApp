import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onFailure = () => {
    this.setState({showSubmitError: true, username: '', password: ''})
  }

  submitData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetail = {username, password}
    const apiURl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetail),
    }
    const response = await fetch(apiURl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="form-container">
          <div className="website-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo-style"
            />
          </div>
          <form className="form-style" onSubmit={this.submitData}>
            <label htmlFor="USERNAME" className="label-style">
              USERNAME
            </label>
            <input
              className="input-style"
              type="text"
              id="USERNAME"
              placeholder="Username"
              onChange={this.onChangeUserName}
              value={username}
            />
            <label htmlFor="PASSWORD" className="label-style">
              PASSWORD
            </label>
            <input
              className="input-style"
              type="password"
              id="PASSWORD"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="btn-style">
              Login
            </button>
            {showSubmitError && (
              <p className="error-msg-style">
                *Username and password didn't match
              </p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
