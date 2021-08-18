import styled, { css } from 'styled-components'

interface FooterProps {
  isFocused: boolean
}

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

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  background-color: #76f898;
`

export const Footer = styled.div<FooterProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  background-color: white;
  border-top: 1px solid #E8E8E8;

  ${({ isFocused }) => isFocused && css`
    bottom: 52px;
  `}
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  outline: none;
  border: 0;
`

export const Background = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: env(safe-area-inset-bottom);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 50%);
`

export const SafariBlockVirtualArea = styled.div`
  height: calc(100% + 1px);
`
