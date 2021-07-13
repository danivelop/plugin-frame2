import React, { useCallback } from 'react'
import * as Styled from './NewTab.styled'

function output() {
  console.log('window.innerHeight', window.innerHeight)
  console.log('window.outerHeight', window.outerHeight)
  console.log('window.visualViewport.height', window.visualViewport.height)
  console.log('window.screen.height', window.screen.height)
  console.log('window.screen.availHeight', window.screen.availHeight)
}

function NewTab() {
  const handleFocus = useCallback(() => {
    setTimeout(() => {
      output()
    }, 700)
  }, [])

  const handleBlur = useCallback(() => {
    window.scrollTo(0, document.scrollingElement?.scrollHeight ?? 0)
    setTimeout(() => {
      output()
    }, 700)
  }, [])

  return (
    <Styled.Wrapper>
      <Styled.MessageStream>
        { (new Array(20)).fill(0).map((item, index) => (
          <React.Fragment key={index}>
            <Styled.PersonMessage>매니저 메세지{index}</Styled.PersonMessage>
            <Styled.GuestMessage>유저 메세지{index}</Styled.GuestMessage>
          </React.Fragment>
        )) }
      </Styled.MessageStream>
      <Styled.RelativeContainer>
        <Styled.RelativeWrapper>
          <Styled.Header />
          <Styled.Footer>
            <Styled.Input
              placeholder="메세지를 입력하세요"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Styled.Footer>
        </Styled.RelativeWrapper>
      </Styled.RelativeContainer>
      {/* <Styled.SafariBlockVirtualArea /> */}
    </Styled.Wrapper>
  )
}

export default NewTab