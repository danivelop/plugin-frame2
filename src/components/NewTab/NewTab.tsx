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
  const [isScrollBottom, setScrollBottom] = useState(false)
  const messageStreamRef = useRef<HTMLDivElement>(null)

  const handleFocus = useCallback(() => {
    setFocused(true)

    setTimeout(() => {
      output()
    }, 700)
  }, [])

  const handleBlur = useCallback(() => {
    setFocused(false)

    setTimeout(() => {
      output()
    }, 700)
  }, [])

  /**
   * @daniel ios15에서 scroll이 bottom일때 over scroll하면 주소창이 올라오는데 이때 beta3까지는 주소창 아랫부분도 영역을 계산해서
   * safe-area-inset-bottom을 주면 주소창 포함하여 botom이 들어감. 하지만 beta4에서는 주소창이 올라왔을때 주소창 포함하여 아랫부분에
   * 가상영역을 생상함. 따라서 safe-area-inset-bottom이 주소창의 윗쪽부터 시작해서 input이 중간에 떠있었음
   * scroll이 bottom에 있을때는 safe-area-inset-bottom을 주지 않도록 하는 함수
   */
   const handleScroll = useCallback(() => {
    const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY
    const scrollHeight = document.scrollingElement?.scrollHeight ?? (window.innerHeight + window.scrollY)
    const clientHeight = document.scrollingElement?.clientHeight ?? window.innerHeight

    if (scrollTop + clientHeight > scrollHeight) {
      setScrollBottom(true)
    } else {
      setScrollBottom(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)

    return function cleanup() {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

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
      <Styled.Footer isFocused={isFocused} isScrollBottom={isScrollBottom}>
        <Styled.Input
          placeholder="메세지를 입력하세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Styled.Footer>
      {/* { isFocused && <Styled.SafariBlockVirtualArea /> } */}
    </Styled.Wrapper>
  )
}

export default NewTab