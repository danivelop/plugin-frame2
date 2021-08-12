import React, { useCallback, useState, useRef, useEffect } from 'react'
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

  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutId = useRef<any>(null)

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

  /**
   * @daniel 키보드를 열었을때 input영역을 터치하여 스크롤 할 때 virtual영역으로 스크롤이 되어 input이 키보드 뒤로 가려지는 문제가 있음.
   * 이 문제 해결을 위해 필요한것
   * 1. 키보드 열었을때 container를 scrollable한 영역으로 만든다.
   *    1) SafariBlockVirtualArea을 사용하여 container보다 1px더 긴 element를 생성
   *    2) container에 overflow-y: auto적용
   * 2. 이렇게 해도 스크롤이 가장 위일때 한번더 over scroll하면 여전히 virtual영역 뒤로 스크롤됨. 이를 위해 스크롤이 가장 위라면 1px만큼 내려줌
   */
  const handleScrollContainer = useCallback(() => {
    console.log('fulfilled')
    if (!containerRef.current) {
      return
    }

    const scrollTop = containerRef.current.scrollTop

    if (scrollTop <= 0) {
      clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        if (!containerRef.current) {
          return
        }
        containerRef.current.scrollTo(0, 1)
      }, 100)
    }
  }, [])

  useEffect(() => {
    if (isFocus) {
      if (!containerRef.current) {
        return
      }

      containerRef.current.addEventListener('scroll', handleScrollContainer)

      return function cleanup() {
        if (!containerRef.current) {
          return
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeEventListener('scroll', handleScrollContainer)
      }
    }
  }, [
    handleScrollContainer,
    isFocus,
  ])

  return (
    <Styled.Container
      ref={containerRef}
      isFocus={isFocus}
    >
      <Styled.Wrapper>
        <Styled.Header>
          <Styled.Close onClick={handleBack}>뒤로가기</Styled.Close>
        </Styled.Header>
        <Styled.MessageStream>
          { (new Array(20)).fill(0).map((item, index) => (
            <React.Fragment key={index}>
              <Styled.PersonMessage>매니저 메세지{index}</Styled.PersonMessage>
              <Styled.GuestMessage>유저 메세지{index}</Styled.GuestMessage>
            </React.Fragment>
          )) }
        </Styled.MessageStream>
        <Styled.Footer>
          <Styled.Input
            placeholder="메세지를 입력하세요"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Styled.Footer>
      </Styled.Wrapper>
      { isFocus && <Styled.SafariBlockVirtualArea /> }
    </Styled.Container>
  )
}

export default Chat
