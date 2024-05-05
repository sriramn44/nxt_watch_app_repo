import {Link} from 'react-router-dom'
import {FaFire} from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'

import SavedListContext from '../../context/SavedListContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {DivContainer, LabelElement, HeadingElement} from './styledComponent'

const SavedVideos = () => (
  <SavedListContext.Consumer>
    {value => {
      const {savedList, theme} = value
      return (
        <DivContainer bg={theme} data-testid="savedVideos">
          <Header />
          <div>
            <Sidebar />
            {savedList.length === 0 ? (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="no-saved-videos-image"
                />
                <HeadingElement co={theme}>
                  No saved videos found
                </HeadingElement>
                <LabelElement co={theme}>
                  You can save your videos while watching them
                </LabelElement>
              </div>
            ) : (
              <div>
                <div data-testid="banner">
                  <FaFire />
                  <h1>Saved Videos</h1>
                </div>
                <ul className="unordered-list">
                  {savedList.map(video => (
                    <Link to={`/videos/${video.id}`}>
                      <li key={video.id}>
                        <img
                          src={video.thumbnailUrl}
                          alt="video thumbnail"
                          className="thumbnail-image"
                        />
                        <div>
                          <div>
                            <p>{video.title}</p>
                            <p>{video.name}</p>
                            <div>
                              <p>{video.viewCount} .</p>
                              <p>
                                {formatDistanceToNow(
                                  new Date(video.publishedAt),
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DivContainer>
      )
    }}
  </SavedListContext.Consumer>
)

export default SavedVideos
