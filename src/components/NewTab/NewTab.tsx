import React, { useRef } from 'react'
import * as Styled from './NewTab.styled'

function NewTab() {
  const inputRef = useRef<HTMLInputElement>(null)

  

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
      <Styled.RelativeWrapper>
        <Styled.Header />
        <Styled.Footer>
          <Styled.Input ref={inputRef} placeholder="메세지를 입력하세요" />
        </Styled.Footer>
      </Styled.RelativeWrapper>
    </Styled.Wrapper>
  )
}

export default NewTab