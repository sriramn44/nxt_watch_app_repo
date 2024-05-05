import styled from 'styled-components'

export const DivContainer = styled.div`
  background-color: ${props => (props.bg ? '#0f0f0f' : '#f9f9f9')};
`

export const LabelElement = styled.p`
  color: ${props => (props.co ? '#ffffff' : '#475569')};
`
