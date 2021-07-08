import React from 'react'

import * as Styled from './Layout.styled'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Styled.Container>
      <Styled.Wrapper>
        {children}
      </Styled.Wrapper>
    </Styled.Container>
  )
}

export default Layout
