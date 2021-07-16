import styled, { css } from 'styled-components'

interface IsFocusedProps {
  isFocused: boolean
}

export const Wrapper = styled.div<IsFocusedProps>`
  width: 100%;

  ${({ isFocused }) => !isFocused && css`
    padding-top: 46px;
    padding-bottom: 46px;
  `}

  ${({ isFocused }) => isFocused && css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  `}
`

export const MessageStream = styled.div<IsFocusedProps>`
  display: flex;
  flex-direction: column;
  position: sticky;
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: white;

  ${({ isFocused }) => !isFocused && css`
    padding-bottom: env(safe-area-inset-bottom, 0);
  `}

  ${({ isFocused }) => isFocused && css`
    position: absolute;
    top: 46px;
    bottom: 46px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `}
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

export const Header = styled.div<IsFocusedProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  background-color: #76f898;

  ${({ isFocused }) => isFocused && css`
    position: absolute;
  `}
`

export const EmptyHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 1px;
`

export const Footer = styled.div<IsFocusedProps>`
  position: fixed;
  bottom: env(safe-area-inset-bottom, 0);
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  background-color: white;
  border-top: 1px solid #E8E8E8;
  z-index: 1;

  ${({ isFocused }) => isFocused && css`
    position: absolute;
    bottom: 0;
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

export const SafariBlockVirtualArea = styled.div`
  height: calc(100% + 1px);
`

export const EmptyBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateZ(-10000px);
  background-color: white;
`
