import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import AdminMain from './AdminMain.js'
import UserMain from './UserMain.js'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/login' component={Home}/>
      <Route exact path='/u' component={UserMain}/>
      <Route exact path='/a' component={AdminMain}/>
    </Switch>
  </main>
)

export default Main;
