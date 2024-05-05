import styled from 'styled-components'

export const DivContainer = styled.div`
  background-color: ${props => (props.bg ? '#181818' : '#f9f9f9')};
`

export const LabelElement = styled.label`
  color: ${props => (props.co ? '#ffffff' : '#475569')};
`

export const BannerDivElement = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
`
