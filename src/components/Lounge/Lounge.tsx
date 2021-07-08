import React, { useCallback, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import * as Styled from './Lounge.styled'

function Lounge() {
  const history = useHistory()

  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickChat = useCallback(() => {
    history.push('/chat')
  }, [history])

  return (
    <Styled.Container ref={containerRef}>
      <Styled.Wrapper>
        <Styled.Header>
          <Styled.Background />
        </Styled.Header>
        <Styled.Content>
          <Styled.ChatCard onClick={handleClickChat}>
            <Styled.ChatItem>채팅1</Styled.ChatItem>
            <Styled.ChatItem>채팅2</Styled.ChatItem>
            <Styled.ChatItem>채팅3</Styled.ChatItem>
          </Styled.ChatCard>
          <Styled.Integration />
        </Styled.Content>
      </Styled.Wrapper>
    </Styled.Container>
  )
}

export default Lounge
