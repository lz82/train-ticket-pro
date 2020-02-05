import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './app.less'
// import styles from './app.module.less'

import ProtectRoute from '@/components/protect-route'
import AuthPanel from '@/components/auth-panel'
import CustomLink from '@/components/custom-link'

import Login from '@/pages/login'
import About from '@/pages/about'
import Home from '@/pages/home'
import Topic from '@/pages/topic'

function App() {
  return (
    <Router>
      <AuthPanel />
      <ul>
        <li>
          <CustomLink to="/about" label="About" activeOnlyWhenExact />
        </li>
        <li>
          <CustomLink to="/home" label="Home" activeOnlyWhenExact />
        </li>
        <li>
          <CustomLink to="/topic" label="Topic" />
        </li>
      </ul>

      <Switch>
        <Route path="/login" component={Login} />

        <Route path="/about">
          <About />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <ProtectRoute path="/topic">
          <Topic />
        </ProtectRoute>
      </Switch>
    </Router>
  )
}

export default App
