import React, { useCallback, useState } from 'react'
import * as Styled from './NewTab.styled'

function output() {
  console.log('window.innerHeight', window.innerHeight)
  console.log('window.outerHeight', window.outerHeight)
  console.log('window.scrollY', window.scrollY)
  console.log('window.visualViewport.height', window.visualViewport.height)
  console.log('window.screen.height', window.screen.height)
  console.log('window.screen.availHeight', window.screen.availHeight)
  console.log('document.scrollingElement.scrollTop', document.scrollingElement?.scrollTop)
  console.log('document.scrollingElement.scrollHeight', document.scrollingElement?.scrollHeight)
  console.log('document.scrollingElement.clientHeight', document.scrollingElement?.clientHeight)
}

function NewTab() {
  const [isFocused, setFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setFocused(true)
    setTimeout(() => {
      output()
    }, 700)
  }, [])

  const handleBlur = useCallback(() => {
    setFocused(false)

    const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY
    const scrollHeight = document.scrollingElement?.scrollHeight ?? (window.innerHeight + window.scrollY)

    if (scrollTop + window.visualViewport.height >= scrollHeight) {
      window.scrollTo(0, document.scrollingElement?.scrollHeight ?? 0)
    }

    setTimeout(() => {
      output()
    }, 700)
  }, [])

  return (
    <Styled.Wrapper isFocused={isFocused}>
      <Styled.MessageStream isFocused={isFocused}>
        { (new Array(20)).fill(0).map((item, index) => (
          <React.Fragment key={index}>
            <Styled.PersonMessage>매니저 메세지{index}</Styled.PersonMessage>
            <Styled.GuestMessage>유저 메세지{index}</Styled.GuestMessage>
          </React.Fragment>
        )) }
      </Styled.MessageStream>
      <Styled.Header isFocused={isFocused} />
      <Styled.Footer isFocused={isFocused}>
        <Styled.Input
          placeholder="메세지를 입력하세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Styled.Footer>
      { isFocused && <Styled.SafariBlockVirtualArea /> }
    </Styled.Wrapper>
  )
}

export default NewTab