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
import { CompleteSubmission } from '../../context/ResponseProvider'

const TeamFeedback = () => {
  const { feedbackRecived } = useSubmissions()
  const questions = React.useContext(QuestionContext)
  const [selectedTeamMember, setSelectedTeamMember] = React.useState<UserT>(
    feedbackRecived[0]?.receiver,
  )
  const [selectedSubmission, setSelectedSubmission] = React.useState<
    CompleteSubmission | undefined
  >(feedbackRecived[0])

  // const selectedSubmission = feedbackRecived.find(
  //   (sub) => sub.giver.id === selectedTeamMember.id,
  // )

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedTeamMember(() => ({ ...user }))
    setSelectedSubmission(
      feedbackRecived.find((submission) => submission.receiver.id === user.id),
    )
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.mainContainer}>
        {feedbackRecived.length > 0 ? (
          <div>
            <h1 className={styles.header}>Team Feedback</h1>
            <div className={styles.feedbackContainer}>
              <ul className={styles.users}>
                <li>
                  <h3 className={styles.subHeading}>Feedback given</h3>
                </li>
                {feedbackRecived.map((feedback) => (
                  <li
                    className={classnames(styles.user, {
                      [styles.userSelected]:
                        selectedTeamMember.id === feedback.giver.id,
                    })}
                    key={feedback.receiver.id}
                    onClick={() => viewTeamMemberSubmission(feedback.giver)}
                  >
                    <User
                      name={feedback.giver.name}
                      avatarUrl={feedback.giver.avatarUrl}
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
                            question.options.find(
                              (option) =>
                                option.value ===
                                selectedSubmission?.responses[index]?.response
                                  ?.answer,
                            )?.label
                          }
                        </>
                      )}

                      <div className={styles.scaleInputContainer}>
                        {question.type === 'scale' && (
                          <Scale
                            viewOnly={true}
                            selectedScore={Number(
                              selectedSubmission?.responses[index]?.response
                                ?.answer,
                            )}
                          />
                        )}
                      </div>

                      {question.type === 'text' && (
                        <div className={styles.textResponseContainer}>
                          <>
                            {
                              selectedSubmission?.responses[index]?.response
                                ?.answer
                            }
                          </>
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
