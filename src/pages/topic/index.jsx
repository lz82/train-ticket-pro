import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import CustomLink from '@/components/custom-link'

const TopicPage = function() {
  const location = useLocation()
  const match = useRouteMatch()
  return (
    <div>
      <h1>this is topics page</h1>

      <ul>
        <li>
          <CustomLink to={`${match.url}/components`} label="Components" activeOnlyWhenExact />
        </li>
        <li>
          <CustomLink
            to={`${match.url}/props-v-state`}
            label="Props v. State"
            activeOnlyWhenExact
          />
        </li>
        <li>
          <CustomLink to={`${match.url}`} label="list" activeOnlyWhenExact />
        </li>
        {/* <li>
          <Redirect to={`${match.url}`}>redirect</Redirect>
        </li> */}
      </ul>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch location={location}>
            <Route path={`${match.url}/:topicId`}>
              <Detail />
            </Route>
            <Route path={`${match.url}`}>
              <h3>Please select a topic</h3>
            </Route>
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

const Detail = function() {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()

  console.log(history, location, params)
  const { topicId } = useParams()
  return <h3>topicId is {topicId}</h3>
}

export default TopicPage
