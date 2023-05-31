import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './reviewFeedback.module.css'
import useSubmissions from '../../hooks/useSubmissions'
import User from '../../components/User/User'
import { UserT } from '../../context/types'
import { QuestionContext } from '../../context/QuestionProvider'
import NoFeedbacDisplay from '../../components/NoFeedbackDisplay/NoFeedbackDisplay'
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion/MultipleChoiceQuestion'
import TextResponse from '../../components/TextResponse/TextResponse'
import Scale from '../../components/Scale/Scale'
import { ResponseContext } from '../../context/ResponseProvider'

const ReviewFeedback = () => {
  const { feedBackGiven } = useSubmissions()
  const questions = React.useContext(QuestionContext)
  const submissions = React.useContext(ResponseContext)
  const [selectedTeamMember, setSelectedTeamMember] =
    React.useState<UserT | null>(feedBackGiven[0]?.receiver)

  const [selectedSubmission, setSelectedSubmission] = React.useState(
    feedBackGiven.find((sub) => sub.receiver.id === selectedTeamMember?.id),
  )

  console.log('Submission', selectedSubmission)
  console.log('Selected member', selectedTeamMember)
  console.log({ feedBackGiven })
  console.log({ allSubmission: submissions })

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedTeamMember(user)
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.mainContainer}>
        {feedBackGiven.length > 0 ? (
          <div>
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

                {questions.map((question, index) => (
                  <li className={styles.responseDisplay} key={question.id}>
                    <p className={styles.question}>{question.label}</p>

                    <div className={styles.response}>
                      {question.type === 'multipleChoice' && (
                        <p>
                          {
                            question.options[
                              Number(
                                selectedSubmission?.responses[index].answer,
                              )
                            ].label
                          }
                        </p>
                      )}

                      <div className={styles.scaleInputContainer}>
                        {question.type === 'scale' && (
                          <Scale
                            onSelectScore={() => console.log('Nein')}
                            selectedScore={Number(
                              selectedSubmission?.responses[index].answer,
                            )}
                          />
                        )}
                      </div>

                      {question.type === 'text' && (
                        <div className={styles.textResponseContainer}>
                          <p>{selectedSubmission?.responses[index].answer}</p>
                        </div>
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

export default ReviewFeedback
