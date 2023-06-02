import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './teamFeedback.module.css'
import useSubmissions from '../../hooks/useSubmissions'
import User from '../../components/User/User'
import { UserT } from '../../context/types'
import NoFeedbacDisplay from '../../components/NoFeedbackDisplay/NoFeedbackDisplay'
import classnames from 'classnames'
import { CompleteSubmission } from '../../context/ResponseProvider'
import DisplayFeedback from '../../components/DisplayFeedback/DisplayFeedback'
import Tag from '../../components/Tag/Tag'
import { text } from 'msw/lib/types/context'

const TeamFeedback = () => {
  const { feedbackRecived } = useSubmissions()
  const [selectedSubmission, setSelectedSubmission] = React.useState<
    CompleteSubmission | undefined
  >(feedbackRecived[0])

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedSubmission(
      feedbackRecived.find((submission) => submission.giver.id === user.id),
    )
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.mainContainer}>
        {feedbackRecived.length > 0 && selectedSubmission ? (
          <div>
            <h1 className={styles.header}>Team Feedback</h1>
            <div className={styles.feedbackContainer}>
              <ul className={styles.users}>
                <li>
                  <h3 className={styles.subHeading}>Feedback given</h3>
                </li>
                {feedbackRecived.map((submission) => (
                  <li
                    className={classnames(styles.user, {
                      [styles.userSelected]:
                        selectedSubmission?.giver.id === submission.giver.id,
                    })}
                    key={submission.giver.id}
                    onClick={() => viewTeamMemberSubmission(submission.giver)}
                  >
                    <User
                      name={submission.giver.name}
                      avatarUrl={submission.giver.avatarUrl}
                    />
                    <span className={styles.tag}>
                      <Tag
                        text={'new'}
                        backgroundColor="var(--primaryColor)"
                        textColor="var(--white)"
                      />
                    </span>
                  </li>
                ))}
              </ul>

              <ul className={styles.feedback}>
                <li>
                  <h2 className={styles.feedbackSubHeading}>
                    {selectedSubmission?.giver.name}'s Feedback
                  </h2>
                </li>

                <DisplayFeedback feedback={selectedSubmission} />
              </ul>
            </div>
          </div>
        ) : (
          <NoFeedbacDisplay />
        )}
      </div>
    </MainLayout>
  )
}

export default TeamFeedback
