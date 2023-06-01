import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './reviewFeedback.module.css'
import useSubmissions from '../../hooks/useSubmissions'
import User from '../../components/User/User'
import { UserT } from '../../context/types'
import NoFeedbacDisplay from '../../components/NoFeedbackDisplay/NoFeedbackDisplay'
import classnames from 'classnames'
import { CompleteSubmission } from '../../context/ResponseProvider'
import DisplayFeedback from '../../components/DisplayFeedback/DisplayFeedback'

const ReviewFeedback = () => {
  const { feedBackGiven } = useSubmissions()
  const [selectedSubmission, setSelectedSubmission] = React.useState<
    CompleteSubmission | undefined
  >(feedBackGiven[0])

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedSubmission(
      feedBackGiven.find((submission) => submission.receiver.id === user.id),
    )
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.mainContainer}>
        {feedBackGiven.length > 0 && selectedSubmission ? (
          <div>
            <h1 className={styles.header}>My Feedback</h1>
            <div className={styles.feedbackContainer}>
              <ul className={styles.users}>
                <li>
                  <h3 className={styles.subHeading}>Feedback given</h3>
                </li>
                {feedBackGiven.map((submission) => (
                  <li
                    className={classnames(styles.user, {
                      [styles.userSelected]:
                        selectedSubmission?.receiver.id ===
                        submission.receiver.id,
                    })}
                    key={submission.receiver.name}
                    onClick={() =>
                      viewTeamMemberSubmission(submission.receiver)
                    }
                  >
                    <User
                      name={submission.receiver.name}
                      avatarUrl={submission.receiver.avatarUrl}
                    />
                  </li>
                ))}
              </ul>

              <ul className={styles.feedback}>
                <li>
                  <h2 className={styles.feedbackSubHeading}>
                    {selectedSubmission?.receiver.name}'s Feedback
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

export default ReviewFeedback
