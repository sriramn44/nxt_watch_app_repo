import {Component} from 'react'
import Cookie from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedListContext from '../../context/SavedListContext'
import {DivContainer, ButtonElement} from './styledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoList: {},
    apiStatus: 'INITIAL',
    like: false,
    disLike: false,
    save: false,
  }

  componentDidMount = () => {
    this.renderHomePageElements()
  }

  renderHomePageElements = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const filteredVideoList = {
        id: data.video_details.id,
        title: data.video_details.title,
        thumbnailUrl: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        videoList: filteredVideoList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    const {like} = this.state
    if (like === false) {
      this.setState({like: true, disLike: false})
    }
    this.setState({like: false})
  }

  onClickDislike = () => {
    const {disLike} = this.state
    if (disLike === false) {
      this.setState({like: false, disLike: true})
    }
    this.setState({disLike: false})
  }

  successPage = () => {
    const {videoList} = this.state
    if (!videoList) return null

    return (
      <SavedListContext.Consumer>
        {value => {
          const {savedItemList, theme} = value

          const onSavedItemList = video => {
            this.setState(prevState => ({save: !prevState.save}))
            savedItemList(video)
          }

          const {like, disLike, save} = this.state

          return (
            <DivContainer bg={theme} data-testid="videoItemDetails">
              <Header />
              <div>
                <Sidebar />
                <div key={videoList.id}>
                  <div>
                    <ReactPlayer
                      url={videoList.videoUrl}
                      controls
                      width="100%"
                      height="auto"
                    />
                    <p>{videoList.title}</p>
                    <p>{videoList.name}</p>
                    <div>
                      <p>{videoList.viewCount} .</p>
                      <p>
                        {formatDistanceToNow(
                          new Date(
                            videoList.publishedAt
                              ? new Date(videoList.publishedAt)
                              : new Date(),
                          ),
                        )}{' '}
                        ago
                      </p>
                      <div>
                        <AiOutlineLike />
                        <ButtonElement
                          li={like}
                          type="button"
                          onClick={this.onClickLike}
                        >
                          Like
                        </ButtonElement>
                        <AiOutlineDislike />
                        <ButtonElement
                          li={disLike}
                          type="button"
                          onClick={this.onClickDislike}
                        >
                          Dislike
                        </ButtonElement>
                        <MdPlaylistAdd />
                        <ButtonElement
                          li={save}
                          type="button"
                          onClick={() => onSavedItemList(videoList)}
                        >
                          {save ? 'Saved' : 'save'}
                        </ButtonElement>
                      </div>
                    </div>
                    <hr />
                    <img
                      src={videoList.profileImageUrl}
                      alt="channel logo"
                      className="channel-logo-image"
                    />
                    <div>
                      <p>{videoList.title}</p>
                      <p>{videoList.subscriberCount} subscribers</p>
                      <p>{videoList.description}</p>
                    </div>
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
          <DivContainer bg={theme} data-testid="videoItemDetails">
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
          <DivContainer bg={theme} data-testid="videoItemDetails">
            <Header />
            <div>
              <Sidebar />
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
                <p>
                  We are having some trouble to complete your request. Please
                  try again.
                </p>
                <button type="button" onClick={this.renderHomePageElements}>
                  Retry
                </button>
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

export default VideoItemDetails
