import {Component} from 'react'

class LoginForm extends Component {
  state = {userName: '', password: '', errmsg: ''}

  updateUsername = event => {
    this.setState({userName: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onFail = errormsg => {
    this.setState({errmsg: errormsg})
  }

  formSubmitted = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(+data)
    if ('jwt_token' in response === true) {
      this.onSubmitSuccess()
    } else {
      this.onFail(response.error_msg)
    }
  }

  render() {
    const {userName, password, errmsg} = this.state
    console.log(userName)
    console.log(password)
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />
        <form onSubmit={this.formSubmitted}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          <div>
            <label htmlFor="userName">USERNAME</label>
            <input
              value={userName}
              type="text"
              id="userName"
              placeholder="Username"
              onChange={this.updateUsername}
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.updatePassword}
            />
          </div>
          <button type="submit">Login</button>
          {errmsg !== '' ? <p>errmsg</p> : null}
        </form>
      </div>
    )
  }
}

export default LoginForm
