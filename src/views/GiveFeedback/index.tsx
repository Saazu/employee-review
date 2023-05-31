import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { useHistory } from 'react-router-dom'
import { AccountContext } from '../../context/AccountProvider'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const { push } = useHistory()
  const currentUser = React.useContext(AccountContext)

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>

        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                <Button
                  onClick={() => {
                    console.log('Fill out', user)
                    push('/share-feedback/new', {
                      giver: currentUser,
                      receiver: user,
                    })
                  }}
                >
                  Fill out
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
