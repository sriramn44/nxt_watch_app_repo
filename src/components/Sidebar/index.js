import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import SavedListContext from '../../context/SavedListContext'
import {DivContainer} from './styledComponent'

const Sidebar = () => (
  <SavedListContext.Consumer>
    {value => {
      const {theme} = value
      return (
        <DivContainer bg={theme} data-testid="home">
          <ul>
            <Link to="/">
              <li key="home">
                <IoMdHome />
                <p>Home</p>
              </li>
            </Link>
            <Link to="/trending">
              <li key="trending">
                <FaFire />
                <p>Trending</p>
              </li>
            </Link>
            <Link to="/gaming">
              <li key="gaming">
                <SiYoutubegaming />
                <p>Gaming</p>
              </li>
            </Link>
            <Link to="/saved-videos">
              <li key="saved-videos">
                <MdPlaylistAdd />
                <p>Saved videos</p>
              </li>
            </Link>
          </ul>
          <div>
            <p>CONTACT US</p>
            <ul>
              <li key="fb">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="facebook-logo-image"
                />
              </li>
              <li key="tw">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="twitter-logo-image"
                />
              </li>
              <li key="li">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="linked-logo-image"
                />
              </li>
            </ul>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </DivContainer>
      )
    }}
  </SavedListContext.Consumer>
)

export default Sidebar
