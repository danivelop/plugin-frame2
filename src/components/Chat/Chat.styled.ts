import styled, { css } from 'styled-components'

interface IsAndroid {
  isAndroid: boolean
}

interface ContainerProps extends IsAndroid {
  isFocus: boolean
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: white;

  /* ${({ isFocus }) => isFocus && css`
    height: calc(100% - 260px);
    top: 260px;
  `} */

  ${({ isAndroid }) => isAndroid && css`
    position: relative;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
    width: 100%;
    height: 100%;
  `}
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const Header = styled.div<IsAndroid>`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  background-color: #76f898;

  ${({ isAndroid }) => isAndroid && css`
    position: fixed;
  `}
`

export const Close = styled.div``

export const MessageStream = styled.div<IsAndroid>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 46px;
  bottom: env(safe-area-inset-bottom, 0);
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: white;
  
  ${({ isAndroid }) => isAndroid && css`
    flex: 1;
    position: static;
    top: unset;
    bottom: unset;
    padding-top: 46px;
    padding-bottom: 46px;
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

export const Footer = styled.div<IsAndroid>`
  position: absolute;
  bottom: env(safe-area-inset-bottom, 0);
  left: 0;
  right: 0;
  width: 100%;
  height: 46px;
  border-top: 1px solid #E8E8E8;

  ${({ isAndroid }) => isAndroid && css`
    position: fixed;
  `}
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
  height: calc(100% + 1px);
`
