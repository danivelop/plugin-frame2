import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: white;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 46px;
  background-color: #76f898;
`

export const Close = styled.div``

export const MessageStream = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 8px;
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

export const Footer = styled.div`
  width: 100%;
  height: 46px;
  padding-bottom: env(safe-area-inset-bottom, 0);
  border-top: 1px solid #E8E8E8;
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  outline: none;;
  border: 0;
`

export const SafariBlockVirtualArea = styled.div`
  width: 1px;
  height: calc(100% + 1px);
`
