import React, { useCallback, useState, useRef, useEffect } from 'react'
import isMobile from 'ismobilejs'
import smoothscroll from 'smoothscroll-polyfill'
import { noop } from 'lodash'
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
  const prevScrollTop = useRef(document.scrollingElement?.scrollTop ?? window.scrollY)

  const timeoutId = useRef<any>(null)

  const handleFocus = useCallback(() => {
    if (isMobile().android.phone) {
      return noop
    }

    setFocused(true)

    const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY
    const scrollHeight = document.scrollingElement?.scrollHeight ?? (window.innerHeight + window.scrollY)
    const clientHeight = document.scrollingElement?.clientHeight ?? window.innerHeight
    
    /**
     * @daniel input에 focus하여 키보드가 나오면 레이아웃을 fixed wrapper처럼 바꿔주고 있음.
     * 이따 scroll이 가장 아래에서 focus시 fixed wrapper로 바뀌면서 height가 순간적으로 줄어들어 레이아웃이 깨짐.
     * 이를 방지하기 위해 스크롤 가장 아래일 경우 scrollTo로 강제로 스크롤을 아래로 이동.
     */
    if (scrollTop + clientHeight >= scrollHeight) {
      window.scrollTo(0, scrollHeight)
    }

    prevScrollTop.current = scrollTop

    setTimeout(() => {
      output()
    }, 700)
  }, [])

  const handleBlur = useCallback(() => {
    if (isMobile().android.phone) {
      return noop
    }

    setFocused(false)
    prevScrollTop.current = messageStreamRef.current?.scrollTop ?? window.scrollY

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

  /**
   * @daniel 키보드가 나왔을때 fixed wrapper처럼 레이아웃을 변경해주고 있는데 이때 스크롤 가장 위나 아래인 상태에서 한번더
   * 같은 뱡향으로 over scroll 하면 document가 아예 키보드 뒷쪽의 가상영역으로 내려가버림. 이를 방지하기 위해 스크롤 가장
   * 위나 아래에 도달했을때 1px만큼 남겨놓기 위한 로직. setTimeout를 넣어준건 안넣어주면 스크롤이 위나 아래 도달하자마자
   * scrollTo로 이동되어 스크롤이 부드럽지 않음. timer에 100만 넣어준 이유는 사파리 특성상 over scrolling일때는 timer가 멈춤.
   * 그래서 100만 넣어주어도 over scrolling중일땐 실행이 안되다가 over scrolling이 멈춘후 실행됨
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleScrollMessageStream = useCallback(() => {
    if (!messageStreamRef.current) {
      return
    }

    const scrollTop = messageStreamRef.current.scrollTop
    const scrollHeight = messageStreamRef.current.scrollHeight
    const clientHeight = messageStreamRef.current.clientHeight

    if (scrollTop <= 0) {
      clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        if (!messageStreamRef.current) {
          return
        }
        messageStreamRef.current.scrollTo(0, 1)
      }, 100)
    }
    if (scrollTop + clientHeight >= scrollHeight) {
      clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        if (!messageStreamRef.current) {
          return
        }
        messageStreamRef.current.scrollTo(0, scrollTop - 1)
      }, 100)
    }
  }, [])

  // useEffect(() => {
  //   if (isMobile().android.phone) {
  //     return noop
  //   }

  //   if (!messageStreamRef.current) {
  //     return
  //   }
  //   if (isFocused) {
  //     messageStreamRef.current.scrollTop = prevScrollTop.current
  //   } else {
  //     window.scrollTo(0 ,prevScrollTop.current)
  //   }
  // }, [isFocused])

  // useEffect(() => {
  //   if (isMobile().android.phone) {
  //     return noop
  //   }

  //   document.addEventListener('scroll', handleScroll)

  //   return function cleanup() {
  //     document.removeEventListener('scroll', handleScroll)
  //   }
  // }, [handleScroll])

  // useEffect(() => {
  //   if (isMobile().android.phone) {
  //     return noop
  //   }

  //   if (!messageStreamRef.current) {
  //     return
  //   }

  //   if (isFocused) {
  //     messageStreamRef.current.addEventListener('scroll', handleScrollMessageStream)

  //     return function cleanup() {
  //       if (!messageStreamRef.current) {
  //         return
  //       }

  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       messageStreamRef.current.removeEventListener('scroll', handleScrollMessageStream)
  //     }
  //   }
  // }, [
  //   handleScrollMessageStream,
  //   isFocused,
  // ])

  return (
    <Styled.Wrapper>
      <Styled.MessageStream ref={messageStreamRef}>
        { (new Array(20)).fill(0).map((item, index) => (
          <React.Fragment key={index}>
            <Styled.PersonMessage>매니저 메세지{index}</Styled.PersonMessage>
            <Styled.GuestMessage>유저 메세지{index}</Styled.GuestMessage>
          </React.Fragment>
        )) }
      </Styled.MessageStream>
      <Styled.Header>
        v1.0.7
      </Styled.Header>
      <Styled.Footer isFocused={isFocused}>
        <Styled.Input
          placeholder="메세지를 입력하세요"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {/* { isFocused && <Styled.SafariBlockVirtualArea /> } */}
      </Styled.Footer>
    </Styled.Wrapper>
  )
}

export default NewTab