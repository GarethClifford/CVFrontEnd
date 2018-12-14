import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.js'
import AdminMain from './AdminMain.js'
import UserMain from './UserMain.js'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route
      path='/u'
      render={(props) => <UserMain {...props} isAuthed={true} />}/>
      <Route path='/a'
      render= {(routeProps) => (<AdminMain {...routeProps} currentStep={this.state.currentStep}/>)}
      />
    </Switch>
  </main>
)

export default Main;
