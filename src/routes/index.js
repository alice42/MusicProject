import 'regenerator-runtime/runtime'
import Babel from 'babel-register'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import mainReducer from '../reducers/mainReducer'
import rootSaga from '../sagas/rootSaga'
import HomeContainer from '../containers/home'
import NotFoundContainer from '../containers/notfound'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route component={NotFoundContainer} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
