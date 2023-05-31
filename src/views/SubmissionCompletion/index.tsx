import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './submissionCompletion.module.css'
import User from '../../components/User'
import Button from '../../components/Button'
import { useHistory } from 'react-router-dom'
import { AccountContext } from '../../context/AccountProvider'
import { UserContext } from '../../context/UserProvider'

const SubmissionCompletion = () => {
  const users = React.useContext(UserContext)
  const { push } = useHistory()
  const currentUser = React.useContext(AccountContext)

  const usersToDisplay = users?.filter((user) => user.id !== currentUser?.id)

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Thank you for sharing your feedback!</h2>
        <h3 className={styles.subTitle}>
          Continue to give feedback to other team members.
        </h3>

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

export default SubmissionCompletion
