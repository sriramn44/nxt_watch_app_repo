import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import SavedListContext from './context/SavedListContext'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
class App extends Component {
  state = {savedList: [], theme: false}

  savedItemList = item => {
    const {savedList} = this.state
    const findId = savedList.find(list => list.id === item.id)
    if (findId === undefined) {
      this.setState(prevState => ({savedList: [...prevState.savedList, item]}))
    } else {
      const filteredList = savedList.filter(list => list.id !== item.id)
      this.setState({savedList: filteredList})
    }
  }

  changeTheme = () => {
    this.setState(prevState => ({theme: !prevState.theme}))
  }

  render() {
    const {savedList, theme} = this.state

    return (
      <SavedListContext.Provider
        value={{
          savedItemList: this.savedItemList,
          savedList,
          theme,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/trending" component={Trending} />
          <ProtectedRoute path="/gaming" component={Gaming} />
          <ProtectedRoute path="/videos/:id" component={VideoItemDetails} />
          <ProtectedRoute path="/saved-videos" component={SavedVideos} />
          <NotFound />
        </Switch>
      </SavedListContext.Provider>
    )
  }
}

export default App
