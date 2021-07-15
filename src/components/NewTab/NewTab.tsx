import React, { useCallback, useState, useRef, useEffect } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import * as Styled from './NewTab.styled'

smoothscroll.polyfill()

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
  const messageStreamRef = useRef<HTMLDivElement>(null)
  const prevScrollTop = useRef(document.scrollingElement?.scrollTop ?? window.scrollY)

  const handleFocus = useCallback(() => {
    setFocused(true)

    const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY
    const scrollHeight = document.scrollingElement?.scrollHeight ?? (window.innerHeight + window.scrollY)
    const clientHeight = document.scrollingElement?.clientHeight ?? window.innerHeight
    
    if (scrollTop + clientHeight >= scrollHeight) {
      window.scrollTo(0, scrollHeight)
    }

    prevScrollTop.current = scrollTop

    setTimeout(() => {
      output()
    }, 700)
  }, [])

  const handleBlur = useCallback(() => {
    setFocused(false)
    prevScrollTop.current = messageStreamRef.current?.scrollTop ?? window.scrollY

    setTimeout(() => {
      output()
    }, 700)
  }, [])

  useEffect(() => {
    if (!messageStreamRef.current) {
      return
    }
    if (isFocused) {
      messageStreamRef.current.scrollTop = prevScrollTop.current
    } else {
      window.scrollTo(0 ,prevScrollTop.current)
    }
  }, [isFocused])

  return (
    <Styled.Wrapper isFocused={isFocused}>
      <Styled.MessageStream
        ref={messageStreamRef}
        isFocused={isFocused}
      >
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