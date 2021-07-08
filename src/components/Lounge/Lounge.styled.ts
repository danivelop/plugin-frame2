import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: white;
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

export const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 240px;
  background: linear-gradient(130deg, #76f898 0%, #76f898 50%, #76f8b6) 100%;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.0001) 0%, #F6F6F7 100%);
  }
`

export const Content = styled.div`
  position: relative;
  margin-bottom: 38px;
  padding: 140px 8px 100px;
`

export const ChatItem = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 10px;
`

export const ChatCard = styled.div`
  width: 100%;
  height: 320px;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 8%), 0 0 0 1px rgb(0 0 0 / 1%);
  border-radius: 10px;
  cursor: pointer;

  ${ChatItem} + ${ChatItem} {
    margin-top: 5px;
  }
`

export const Integration = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 50px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 20%), 0 0 0 1px rgb(0 0 0 / 10%);
  border-radius: 10px;
`
