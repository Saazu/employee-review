import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { useRouteMatch } from 'react-router-dom'
import useSubmissions from '../../hooks/useSubmissions'
import User from '../../components/User/User'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  let route = useRouteMatch()
  const { numFeedbackGiven, numFeedbackReceived } = useSubmissions()

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink
        exact
        to="/share-feedback"
        activeClassName={styles.active}
        isActive={() => route.path.includes('/share-feedback')}
      >
        Share Feedback
      </NavLink>
      <NavLink exact to="/my-feedback" activeClassName={styles.active}>
        My Feedback{' '}
        {numFeedbackGiven > 0 && (
          <span className={styles.notification}>{numFeedbackGiven}</span>
        )}
      </NavLink>
      <NavLink exact to="/team-feedback" activeClassName={styles.active}>
        Team Feeback{' '}
        {numFeedbackReceived > 0 && (
          <span className={styles.notification}>{numFeedbackReceived}</span>
        )}
      </NavLink>
      <span className={styles.spacer} />
      <NavLink exact to="/" onClick={handleLogout}>
        {currentUser && (
          <User
            name={currentUser.name}
            displayName={false}
            avatarUrl={currentUser.avatarUrl}
          />
        )}{' '}
        <div className={styles.logoutWrapper}>
          <p className={styles.name}>{currentUser && currentUser.name}</p>
          <p className={styles.logout}>Logout</p>
        </div>
      </NavLink>
    </div>
  )
}
export default Header
