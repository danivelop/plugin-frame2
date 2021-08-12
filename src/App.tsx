import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ChatPage, LoungePage, NewTabPage } from 'pages'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/all" component={LoungePage} />
        <Route exact path="/fixedwrapper" component={ChatPage} />
        <Route exact path="/bodyscroll" component={NewTabPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
