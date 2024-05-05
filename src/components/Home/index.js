import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdClose, IoIosSearch} from 'react-icons/io'
import Cookie from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedListContext from '../../context/SavedListContext'
import {DivContainer, BannerDivElement} from './styledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    videoList: [],
    apiStatus: 'INITIAL',
    isBannerClosed: true,
  }

  onChangeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  componentDidMount = () => {
    this.renderHomePageElements()
  }

  renderHomePageElements = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
    return videoList.length === 0 ? (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="no-videos-image"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button type="button" onClick={this.renderHomePageElements}>
          Retry
        </button>
      </div>
    ) : (
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
                <img
                  src={video.profileImageUrl}
                  alt="channel logo"
                  className="channel-logo-image"
                />
                <div>
                  <p>{video.title}</p>
                  <p>{video.name}</p>
                  <div>
                    <p>{video.viewCount} .</p>
                    <p>{formatDistanceToNow(new Date(video.publishedAt))}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  loadingPage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failurePage = () => (
    <SavedListContext.Consumer>
      {value => {
        const {theme} = value
        return (
          <div>
            <img
              src={
                theme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
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

  closeBanner = () => {
    this.setState(prevState => ({isBannerClosed: !prevState.isBannerClosed}))
  }

  render() {
    const {searchInput, isBannerClosed} = this.state

    return (
      <SavedListContext.Consumer>
        {value => {
          const {theme} = value

          return (
            <DivContainer bg={theme} data-testid="home">
              <Header />
              <div>
                <Sidebar />
                <div>
                  {isBannerClosed && (
                    <BannerDivElement data-testid="banner">
                      <div>
                        <img
                          src={
                            theme
                              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                          }
                          alt="nxt watch logo"
                          className="next-logo-image"
                        />
                        <button
                          type="button"
                          aria-label="close"
                          data-testid="close"
                          onClick={this.closeBanner}
                        >
                          <IoMdClose />
                        </button>
                      </div>

                      <p>Buy Nxt Watch Premium</p>
                      <button type="button">GET IT NOW</button>
                    </BannerDivElement>
                  )}
                  <div>
                    <div>
                      <input
                        type="search"
                        value={searchInput}
                        onChange={this.onChangeSearch}
                      />
                      <button
                        type="button"
                        data-testid="searchButton"
                        aria-label="Click me"
                        onClick={this.renderHomePageElements}
                      >
                        <IoIosSearch />
                      </button>
                    </div>
                    {this.renderProfileData()}
                  </div>
                </div>
              </div>
            </DivContainer>
          )
        }}
      </SavedListContext.Consumer>
    )
  }
}

export default Home
