import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { useHistory } from 'react-router-dom'
import { AccountContext } from '../../context/AccountProvider'
import useSubmissions from '../../hooks/useSubmissions'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const { push } = useHistory()
  const currentUser = React.useContext(AccountContext)
  const { usersGivenFeedbackTo } = useSubmissions()

  const usersToDisplay = users?.filter(
    (user) =>
      user.id !== currentUser?.id ||
      !usersGivenFeedbackTo.includes(currentUser?.id),
  )

  console.log('Number to go', usersToDisplay?.length)

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>

        {usersToDisplay && usersToDisplay.length > 0 && (
          <ul className={styles.users}>
            {usersToDisplay.map((user) => (
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
