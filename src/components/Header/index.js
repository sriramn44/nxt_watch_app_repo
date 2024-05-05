import {withRouter, Link} from 'react-router-dom'
import Cookie from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import SavedListContext from '../../context/SavedListContext'
import {DivContainer} from './styledComponents'

const Header = props => {
  const logoutButton = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <SavedListContext.Consumer>
      {value => {
        const {changeTheme, theme} = value

        return (
          <DivContainer bg={theme} data-testid="home">
            <Link to="/">
              <img
                src={
                  theme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
                className="next-watch-logo-image"
              />
            </Link>
            <ul>
              <li key="theme">
                <button
                  type="button"
                  aria-label="theme"
                  onClick={() => changeTheme()}
                  data-testid="theme"
                >
                  <FaMoon />
                </button>
              </li>
              <li key="profile-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-image"
                />
              </li>

              <li key="logout-button" className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button type="button" className="trigger-button">
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <>
                      <div>
                        <p>Are you sure, you want to logout</p>
                      </div>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="logout-button"
                        onClick={() => {
                          logoutButton()
                          close()
                        }}
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </Popup>
              </li>
            </ul>
          </DivContainer>
        )
      }}
    </SavedListContext.Consumer>
  )
}
export default withRouter(Header)
