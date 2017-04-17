'use strict'
import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import Jokes from './containers/JokesContainer'
import NotFound from './components/NotFound'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/jokes" component={Jokes} />
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
