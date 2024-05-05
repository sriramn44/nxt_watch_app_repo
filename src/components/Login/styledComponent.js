import styled from 'styled-components'

export const DivContainer = styled.div`
  background-color: ${props => (props.bg ? '#181818' : ' #f9f9f9 ')};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FormContainer = styled.form`
  background-color: ${props => (props.bg ? '#000000' : ' #f9f9f9 ')};
  padding: 30px;
`

export const LabelElement = styled.label`
  color: ${props => (props.co ? '#ffffff' : '#475569')};
`
export const ButtonElement = styled.button`
  color: #ffffff;
`
