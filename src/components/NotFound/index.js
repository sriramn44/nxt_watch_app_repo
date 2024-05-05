import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedListContext from '../../context/SavedListContext'
import {DivContainer, LabelElement, HeadingElement} from './styledComponent'

const NotFound = () => (
  <SavedListContext.Consumer>
    {value => {
      const {theme} = value

      return (
        <DivContainer bg={theme} className="bg-container">
          <Header />
          <div>
            <Sidebar />
            <div>
              <img
                src={
                  theme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                }
                alt="not found"
                className="not-found-image"
              />
              <HeadingElement co={theme}>Page Not Found</HeadingElement>
              <LabelElement co={theme}>
                we are sorry, the page you requested could not be found.
              </LabelElement>
            </div>
          </div>
        </DivContainer>
      )
    }}
  </SavedListContext.Consumer>
)

export default NotFound
