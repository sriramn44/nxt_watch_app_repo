import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaFire} from 'react-icons/fa'
import Cookie from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedListContext from '../../context/SavedListContext'
import {DivContainer} from './styledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {videoList: [], apiStatus: 'INITIAL'}

  componentDidMount = () => {
    this.renderHomePageElements()
  }

  renderHomePageElements = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const filteredVideoList = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
        name: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,
        publishedAt: video.published_at,
      }))
      this.setState({
        videoList: filteredVideoList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successPage = () => {
    const {videoList} = this.state

    return (
      <SavedListContext.Consumer>
        {value => {
          const {theme} = value

          return (
            <DivContainer
              bg={theme}
              className="bg-container"
              data-testid="trending"
            >
              <Header />
              <div>
                <Sidebar />
                <div>
                  <div className="bg-banner-container" data-testid="banner">
                    <div>
                      <FaFire />
                      <h1>Trending</h1>
                    </div>
                  </div>
                  <div>
                    <ul className="unordered-list">
                      {videoList.map(video => (
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
                                  <p>{video.viewCount}</p>
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
                </div>
              </div>
            </DivContainer>
          )
        }}
      </SavedListContext.Consumer>
    )
  }

  loadingPage = () => (
    <SavedListContext.Consumer>
      {value => {
        const {theme} = value

        return (
          <DivContainer
            bg={theme}
            className="bg-container"
            data-testid="trending"
          >
            <Header />
            <div>
              <Sidebar />
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            </div>
          </DivContainer>
        )
      }}
    </SavedListContext.Consumer>
  )

  failurePage = () => (
    <SavedListContext.Consumer>
      {value => {
        const {theme} = value

        return (
          <DivContainer
            bg={theme}
            className="bg-container"
            data-testid="trending"
          >
            <Header />
            <div>
              <Sidebar />
              <div>
                <div>
                  <img
                    src={
                      theme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                    }
                    alt="failure view"
                    className="failure-view-image"
                  />
                  <h1>Oops! Something Went Wrong</h1>
                  <p>We are having some trouble to complete your request.</p>
                  <p>Please try again.</p>
                  <button type="button" onClick={this.renderHomePageElements}>
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </DivContainer>
        )
      }}
    </SavedListContext.Consumer>
  )

  renderProfileData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successPage()
      case apiStatusConstants.inProgress:
        return this.loadingPage()
      case apiStatusConstants.failure:
        return this.failurePage()
      default:
        return null
    }
  }

  render() {
    return this.renderProfileData()
  }
}

export default Trending
