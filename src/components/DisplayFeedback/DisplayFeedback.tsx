import * as React from 'react'
import styles from './multipleChoiceQuestion.module.css'
import { NewAnswer, Submission } from '../../context/ResponseProvider'
import { UserT } from '../../context/types'
import { Question2T, QuestionT } from '../../context/QuestionProvider'
import classnames from 'classnames'
import User from '../User/User'
import Scale from '../Scale/Scale'

type Props = {
  feedback: Submission[]
  questions: (Question2T | QuestionT)[]
}

const DisplayFeedback = (props: Props) => {
  const { feedback, questions } = props

  const [selectedTeamMember, setSelectedTeamMember] = React.useState<UserT>(
    feedback[0].receiver,
  )
  const [selectedSubmission, setSelectedSubmission] = React.useState(
    feedback.find((sub) => sub.receiver.id === selectedTeamMember.id),
  )

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedSubmission(feedback.find((sub) => sub.receiver.id === user.id))
    setSelectedTeamMember({ ...user })
  }

  console.log('Selected submission', selectedSubmission)

  return (
    <div>
      {feedback.map((feedBackGiven) => (
        <li
          className={classnames(styles.user, {
            [styles.userSelected]:
              selectedTeamMember.id === feedBackGiven.giver.id,
          })}
          key={feedBackGiven.receiver.id}
          onClick={() => viewTeamMemberSubmission(feedBackGiven.giver)}
        >
          <User
            name={feedBackGiven.giver.name}
            avatarUrl={feedBackGiven.giver.avatarUrl}
          />
        </li>
      ))}

      {questions.map((question, index) => (
        <li className={styles.responseDisplay} key={question.id}>
          <p className={styles.question}>{question.label}</p>

          <div className={styles.response}>
            {question.type === 'multipleChoice' && (
              <>
                {
                  question.options[
                    Number(selectedSubmission?.responses[index]?.answer)
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
    </div>
  )
}

export default DisplayFeedback
