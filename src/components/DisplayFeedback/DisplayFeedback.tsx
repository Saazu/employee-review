import * as React from 'react'
import styles from './displayFeedback.module.css'
import Scale from '../Scale/Scale'
import { CompleteSubmission } from '../../context/ResponseProvider'

type Props = {
  feedback: CompleteSubmission //Submission[]
}

const DisplayFeedback = (props: Props) => {
  const { feedback } = props
  console.log('Feedback', feedback)

  return feedback ? (
    <>
      {feedback?.responses?.map((response) => (
        <React.Fragment
          key={`${response?.question?.id}-${feedback.receiver.id}-${feedback.giver.id}`}
        >
          <li className={styles.responseDisplay}>
            <p className={styles.question}>{response?.question?.label}</p>

            <div className={styles.response}>
              {response?.response?.answer !== -1 ? (
                <>
                  {response?.question?.type === 'multipleChoice' && (
                    <>
                      {
                        response?.question?.options[
                          Number(response?.response?.answer) - 1
                        ]?.label
                      }
                    </>
                  )}

                  <div className={styles.scaleInputContainer}>
                    {response?.question?.type === 'scale' && (
                      <Scale
                        viewOnly={true}
                        selectedScore={Number(response?.response?.answer)}
                      />
                    )}
                  </div>

                  {response?.question.type === 'text' && (
                    <div className={styles.textResponseContainer}>
                      <>{response?.response?.answer}</>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <span className={styles.skipTag}>SKIPPED</span>
                </>
              )}
            </div>
          </li>
        </React.Fragment>
      ))}
    </>
  ) : null
}

export default DisplayFeedback
