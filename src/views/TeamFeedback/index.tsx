import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './teamFeedback.module.css'
import useSubmissions from '../../hooks/useSubmissions'
import User from '../../components/User/User'
import { UserT } from '../../context/types'
import { QuestionContext } from '../../context/QuestionProvider'
import NoFeedbacDisplay from '../../components/NoFeedbackDisplay/NoFeedbackDisplay'
import Scale from '../../components/Scale/Scale'
import classnames from 'classnames'

const TeamFeedback = () => {
  const { feedBackReceived } = useSubmissions()
  const questions = React.useContext(QuestionContext)
  const [selectedTeamMember, setSelectedTeamMember] = React.useState<UserT>(
    feedBackReceived[0]?.receiver,
  )

  console.log('Feedback received', feedBackReceived)

  const [selectedSubmission, setSelectedSubmission] = React.useState(
    feedBackReceived.find((sub) => sub.receiver.id === selectedTeamMember.id),
  )
  console.log('Selected submission', selectedSubmission)

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedSubmission(
      feedBackReceived.find((sub) => sub.receiver.id === user.id),
    )
    setSelectedTeamMember({ ...user })
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.mainContainer}>
        {feedBackReceived.length > 0 ? (
          <div>
            <h1 className={styles.header}>Team Feedback</h1>
            <div className={styles.feedbackContainer}>
              <ul className={styles.users}>
                <li>
                  <h3 className={styles.subHeading}>Feedback given</h3>
                </li>
                {feedBackReceived.map((feedBackGiven) => (
                  <li
                    className={classnames(styles.user, {
                      [styles.userSelected]:
                        selectedTeamMember.id === feedBackGiven.giver.id,
                    })}
                    key={feedBackGiven.receiver.id}
                    onClick={() =>
                      viewTeamMemberSubmission(feedBackGiven.giver)
                    }
                  >
                    <User
                      name={feedBackGiven.giver.name}
                      avatarUrl={feedBackGiven.giver.avatarUrl}
                    />
                  </li>
                ))}
              </ul>

              <ul className={styles.feedback}>
                <li>
                  <h2 className={styles.feedbackSubHeading}>
                    {selectedSubmission?.giver.name}'s Feedback
                  </h2>
                </li>

                {questions.map((question, index) => (
                  <li className={styles.responseDisplay} key={question.id}>
                    <p className={styles.question}>{question.label}</p>

                    <div className={styles.response}>
                      {question.type === 'multipleChoice' && (
                        <>
                          {
                            question.options[
                              Number(
                                selectedSubmission?.responses[index]?.answer,
                              )
                            ]?.label
                          }
                        </>
                      )}

                      <div className={styles.scaleInputContainer}>
                        {question.type === 'scale' && (
                          <Scale
                            viewOnly={true}
                            onSelectScore={() => console.log('Nein')}
                            selectedScore={Number(
                              selectedSubmission?.responses[index]?.answer,
                            )}
                          />
                        )}
                      </div>

                      {question.type === 'text' && (
                        <div className={styles.textResponseContainer}>
                          <>{selectedSubmission?.responses[index]?.answer}</>
                        </div>
                      )}

                      {selectedSubmission?.responses[index] === null && (
                        <span className={styles.skipTag}>SKIPPED</span>
                      )}
                    </div>
                  </li>
                ))}
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
