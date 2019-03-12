import 'regenerator-runtime/runtime'
import Babel from 'babel-register'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomeContainer from '../containers/home'
import EditorContainer from '../containers/editor'
import NotFoundContainer from '../containers/notfound'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route exact path="/editor" component={EditorContainer} />
      <Route component={NotFoundContainer} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
