import React, { useCallback, useState } from 'react'
import isMobile from 'ismobilejs'
import { useHistory } from 'react-router-dom'
import * as Styled from './Chat.styled'

function output() {
  console.log('window.innerHeight', window.innerHeight)
  console.log('window.outerHeight', window.outerHeight)
  console.log('window.visualViewport.height', window.visualViewport.height)
  console.log('window.screen.height', window.screen.height)
  console.log('window.screen.availHeight', window.screen.availHeight)
}

function Chat() {
  const history = useHistory()

  const [isFocus, setFocus] = useState(false)

  const handleBack = useCallback(() => {
    history.replace('/all')
  }, [history])

  const handleFocus = useCallback(() => {
    setFocus(true)
    setTimeout(() => {
      output()
    }, 700)
  }, [])

  const handleBlur = useCallback(() => {
    setFocus(false)
    setTimeout(() => {
      output()
    }, 700)
  }, [])

  return (
    <Styled.Container isAndroid={isMobile().android.phone} isFocus={isFocus}>
      <Styled.Wrapper>
        <Styled.Header isAndroid={isMobile().android.phone}>
          <Styled.Close onClick={handleBack}>뒤로가기</Styled.Close>
        </Styled.Header>
        <Styled.MessageStream isAndroid={isMobile().android.phone}>
          { (new Array(20)).fill(0).map((item, index) => (
            <React.Fragment key={index}>
              <Styled.PersonMessage>매니저 메세지{index}</Styled.PersonMessage>
              <Styled.GuestMessage>유저 메세지{index}</Styled.GuestMessage>
            </React.Fragment>
          )) }
        </Styled.MessageStream>
        <Styled.Footer isAndroid={isMobile().android.phone}>
          <Styled.Input
            placeholder="메세지를 입력하세요"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Styled.Footer>
      </Styled.Wrapper>
      <Styled.SafariBlockVirtualArea />
    </Styled.Container>
  )
}

export default Chat
