import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './reviewFeedback.module.css'
import useSubmissions from '../../hooks/useSubmissions'
import User from '../../components/User/User'
import { UserT } from '../../context/types'
import { QuestionContext } from '../../context/QuestionProvider'
import NoFeedbacDisplay from '../../components/NoFeedbackDisplay/NoFeedbackDisplay'
import NotFound from '../../components/NotFound404/NotFound'

const ReviewFeedback = () => {
  const { feedBackGiven } = useSubmissions()
  const questions = React.useContext(QuestionContext)
  const [selectedTeamMember, setSelectedTeamMember] =
    React.useState<UserT | null>(feedBackGiven[0]?.receiver)
  console.log('hello')
  console.log({ feedBackGiven })

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedTeamMember(user)
  }

  return (
    <MainLayout loggedIn>
      <NoFeedbacDisplay />
      <NotFound />

      {feedBackGiven.length > 0 ? (
        <>
          <h1 className={styles.header}>My Feedback</h1>

          <div className={styles.feedbackContainer}>
            <ul className={styles.users}>
              <li>
                <h3 className={styles.subHeading}>Feedback given</h3>
              </li>
              {feedBackGiven.map((feedBackGiven) => (
                <li
                  key={feedBackGiven.receiver.id}
                  onClick={() =>
                    viewTeamMemberSubmission(feedBackGiven.receiver)
                  }
                >
                  <User
                    name={feedBackGiven.receiver.name}
                    avatarUrl={feedBackGiven.receiver.avatarUrl}
                  />
                </li>
              ))}
            </ul>

            <ul className={styles.feedback}>
              <li>
                <h2 className={styles.feedbacSubHeading}>
                  {selectedTeamMember?.name}'s Feedback
                </h2>
              </li>
              {questions.map((question) => (
                <li key={question.id}>
                  <p className={styles.question}>{question.label}</p>
                  <div className={styles.response}>{}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <NoFeedbacDisplay />
      )}
    </MainLayout>
  )
}

export default ReviewFeedback
