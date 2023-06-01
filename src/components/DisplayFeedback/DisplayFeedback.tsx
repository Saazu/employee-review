import * as React from 'react'
import styles from './displayFeedback.module.css'
// import { Submission } from '../../context/ResponseProvider'
import { UserT } from '../../context/types'
import { Question2T, QuestionT } from '../../context/QuestionProvider'
import classnames from 'classnames'
import User from '../User/User'
import Scale from '../Scale/Scale'

type Props = {
  feedback: any //Submission[]
  questions: (Question2T | QuestionT)[]
  header: string | undefined
  view: 'teamfeedback' | 'myfeedback'
}

const DisplayFeedback = (props: Props) => {
  const { feedback, questions, header, view } = props

  const [selectedTeamMember, setSelectedTeamMember] = React.useState<UserT>(
    feedback[0].receiver,
  )
  const [selectedSubmission, setSelectedSubmission] = React.useState(
    feedback.find((sub: any) => sub.receiver.id === selectedTeamMember.id),
  )

  function viewTeamMemberSubmission(user: UserT) {
    setSelectedSubmission(
      feedback.find((sub: any) => sub.receiver.id === user.id),
    )
    setSelectedTeamMember({ ...user })
  }

  return (
    <div>
      <h1 className={styles.header}>{header}</h1>
      <div className={styles.feedbackContainer}>
        <ul className={styles.users}>
          <li>
            <h3 className={styles.subHeading}>Feedback given</h3>
          </li>
          {feedback.map((f: any) => (
            <li
              className={classnames(styles.user, {
                [styles.userSelected]: selectedTeamMember.id === f.giver.id,
              })}
              key={f.receiver.id}
              onClick={() => viewTeamMemberSubmission(f.giver)}
            >
              <User name={f.giver.name} avatarUrl={f.giver.avatarUrl} />
            </li>
          ))}
        </ul>

        <ul className={styles.feedback}>
          <li>
            <h2 className={styles.feedbackSubHeading}>
              {view === 'myfeedback'
                ? selectedTeamMember?.name
                : selectedSubmission?.giver.name}
              's Feedback
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
                        Number(selectedSubmission?.responses[index]?.answer)
                      ]?.label
                    }
                  </>
                )}

                <div className={styles.scaleInputContainer}>
                  {question.type === 'scale' && (
                    <Scale
                      viewOnly={true}
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
  )
}

export default DisplayFeedback
