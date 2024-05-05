import styled from 'styled-components'

export const DivContainer = styled.div`
  background-color: ${props => (props.bg ? ' #0f0f0f ' : '#f9f9f9')};
`

export const LabelElement = styled.p`
  color: ${props => (props.co ? '#ffffff' : '#475569')};
`
export const ButtonElement = styled.button`
  color: ${props => (props.li ? ' #2563eb' : '#64748b')};
`
