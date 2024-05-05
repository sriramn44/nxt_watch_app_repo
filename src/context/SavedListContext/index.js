import React from 'react'

const SavedListContext = React.createContext({
  savedList: [],
  savedItemList: () => {},
  theme: '',
  changeTheme: () => {},
})

export default SavedListContext
