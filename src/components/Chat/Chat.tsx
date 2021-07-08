import React, { useCallback, useState } from 'react'
import isMobile from 'ismobilejs'
import { useHistory } from 'react-router-dom'
import * as Styled from './Chat.styled'

function Chat() {
  const history = useHistory()

  const [isFocus, setFocus] = useState(false)

  const handleBack = useCallback(() => {
    history.replace('/all')
  }, [history])

  const handleFocus = useCallback(() => {
    setFocus(true)
  }, [])

  const handleBlur = useCallback(() => {
    setFocus(false)
  }, [])

  return (
    <Styled.Wrapper isAndroid={isMobile().android.phone} isFocus={isFocus}>
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
      <Styled.SafariBlockVirtualArea />
    </Styled.Wrapper>
  )
}

export default Chat
