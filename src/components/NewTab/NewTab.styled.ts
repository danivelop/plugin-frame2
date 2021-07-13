import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 46px;
  padding-bottom: 46px;
`

export const MessageStream = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 8px;
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-sizing: border-box;
  background-color: white;
`

export const PersonMessage = styled.div`
  align-self: flex-start;
  min-width: 80px;
  padding: 10px 8px;
  background-color: #E8E8E8;
  border-radius: 10px;
`

export const GuestMessage = styled.div`
  align-self: flex-end;
  min-width: 80px;
  padding: 10px 8px;
  background-color: #E8E8E8;
  border-radius: 10px;
`

export const RelativeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
`

export const RelativeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  background-color: #76f898;
`

export const Footer = styled.div`
  position: absolute;
  bottom: env(safe-area-inset-bottom, 0);
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  background-color: white;
  border-top: 1px solid #E8E8E8;
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  outline: none;
  border: 0;
`

export const SafariBlockVirtualArea = styled.div`
  height: calc(100% + 1px);
`
