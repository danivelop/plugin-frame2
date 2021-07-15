import React, { useCallback, useState, useRef, useEffect } from 'react'
import BodyScrollService from 'services/BodyScrollService'
import * as Styled from './NewTab.styled'

function output() {
  console.log('window.innerHeight', window.innerHeight)
  console.log('window.outerHeight', window.outerHeight)
  console.log('window.visualViewport.height', window.visualViewport.height)
  console.log('window.screen.height', window.screen.height)
  console.log('window.screen.availHeight', window.screen.availHeight)
}

function NewTab() {
  const [isFocused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  const mockRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    BodyScrollService.scrollTo(0, document.body.scrollHeight)
  }, [])

  const handleClickMock = useCallback(() => {
    mockRef.current?.blur()
    setTimeout(() => {
      output()
    }, 700)
    scrollToBottom()
    inputRef.current?.focus()
  }, [scrollToBottom])

  const handleTouchMove = useCallback(() => {
    inputRef.current?.blur()
  }, [])

  useEffect(function cleanUp() {
    return () => {
      BodyScrollService.unsubscribeScrollEvents()
    }
  }, [handleTouchMove])

  const handleFocus = useCallback(() => {
    setFocused(true)
      BodyScrollService.subscribeScrollEvents(handleTouchMove)
  }, [
    setFocused,
    handleTouchMove,
  ])

  const handleBlur = useCallback(() => {
    setFocused(false)
    setTimeout(() => {
      output()
    }, 700)
    scrollToBottom()
      BodyScrollService.unsubscribeScrollEvents()
  }, [
    scrollToBottom,
  ])

  const handleChangeValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
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
      <Styled.InputWrapper
        isFocused={isFocused}
      >
        <Styled.Input
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeValue}
          placeholder="메세지를 입력하세요"
        />
      </Styled.InputWrapper>

      <Styled.Header />
      <Styled.Footer
        isFocused={isFocused}
        onClick={handleClickMock}
      >
        <Styled.Input
          ref={mockRef}
          value={value && `${value} 가짜 input`}
          onFocus={handleClickMock}
          placeholder="메세지를 입력하세요: 가짜 input"
        />
        
      </Styled.Footer>
      {/* <Styled.SafariBlockVirtualArea /> */}
    </Styled.Wrapper>
  )
}

export default NewTab