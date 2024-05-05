import styled from 'styled-components'

export const DivContainer = styled.div`
  background-color: ${props => (props.bg ? '#181818' : '#f9f9f9')};
`

export const LabelElement = styled.p`
  color: ${props => (props.co ? '#ffffff' : '#475569')};
`

export const HeadingElement = styled.h1`
  color: ${props => (props.co ? '#ffffff' : '#475569')};
`
