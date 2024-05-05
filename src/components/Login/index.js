import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'
import SavedListContext from '../../context/SavedListContext'
import {
  DivContainer,
  LabelElement,
  FormContainer,
  ButtonElement,
} from './styledComponent'

class Login extends Component {
  state = {username: '', password: '', isChecked: false, errorMsg: ''}

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  handleShowPassword = e => {
    this.setState({isChecked: e.target.checked})
  }

  successView = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failureView = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.successView(data.jwt_token)
    } else {
      const data = await response.json()
      this.failureView(data.error_msg)
    }
  }

  render() {
    const {username, password, isChecked, errorMsg} = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <SavedListContext.Consumer>
        {value => {
          const {theme} = value

          return (
            <DivContainer bg={theme}>
              <FormContainer bg={theme} onSubmit={this.onSubmit}>
                <img
                  src={
                    theme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="website-logo"
                />
                <LabelElement co={theme} htmlFor="username">
                  USERNAME
                </LabelElement>
                <input
                  id="username"
                  value={username}
                  type="text"
                  onChange={this.onChangeUsername}
                  placeholder="Username"
                />
                <LabelElement co={theme} htmlFor="password">
                  PASSWORD
                </LabelElement>
                <input
                  id="password"
                  value={password}
                  type={isChecked ? 'type' : 'password'}
                  onChange={this.onChangePassword}
                  placeholder="Password"
                />
                <div>
                  <input
                    id="checkbox"
                    type="checkbox"
                    onChange={this.handleShowPassword}
                  />
                  <LabelElement co={theme} htmlFor="checkbox">
                    Show Password
                  </LabelElement>
                </div>
                <ButtonElement type="submit">Login</ButtonElement>
                {errorMsg && <p>*{errorMsg}</p>}
              </FormContainer>
            </DivContainer>
          )
        }}
      </SavedListContext.Consumer>
    )
  }
}

export default Login
