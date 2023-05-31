import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import { UserT } from '../../context/types'
import styles from './newFeedback.module.css'
import { QuestionContext } from '../../context/QuestionProvider'
import { useLocation, useHistory } from 'react-router-dom'
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion/MultipleChoiceQuestion'
import Scale from '../../components/Scale/Scale'
import Button from '../../components/Button/Button'
import TextResponse from '../../components/TextResponse/TextResponse'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import useGiveFeedbackWizard from '../../hooks/useGiveFeedbackWizard'
import { NewAnswer } from '../../context/ResponseProvider'

type LocationState = {
  giver: UserT
  receiver: UserT
}

const NewFeedback = () => {
  const questions = React.useContext(QuestionContext)
  const { state } = useLocation<LocationState>()
  const { giver, receiver } = state
  const { push } = useHistory()
  const {
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    numWizardSteps,
    currentQuestionIndex,
    completeSubmission,
    saveResponse,
    responses,
  } = useGiveFeedbackWizard(giver, receiver, questions)

  function handleNextButtonClick() {
    if (currentQuestionIndex + 1 === numWizardSteps) {
      completeSubmission()
    } else {
      goToNextQuestion()
    }
  }

  function saveAnswer(newResponse: NewAnswer) {
    saveResponse(currentQuestionIndex, newResponse)
  }

  console.log('Responses', responses)
  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            onClick={() => push('/share-feedback')}
            className={styles.backButton}
          >
            BACK
          </div>
          <div className={styles.header}>
            <section>
              <h2 className={styles.question}>{currentQuestion.label}</h2>
              <p className={styles.subTitle}>
                SHARE YOUR FEEDBACK FOR {receiver.name.toUpperCase()}
              </p>
            </section>
            <div>
              <User
                name={receiver.name}
                avatarUrl={receiver.avatarUrl}
                displayName={false}
              />
            </div>
          </div>
          <div className={styles.responseContainer}>
            <div className={styles.responseInput}>
              {currentQuestion.type === 'multipleChoice' && (
                <MultipleChoiceQuestion
                  options={currentQuestion.options}
                  onOptionSelect={saveAnswer}
                />
              )}
              <div className={styles.scaleInputContainer}>
                {currentQuestion.type === 'scale' && (
                  <Scale onSelectScore={saveAnswer} />
                )}
              </div>

              {currentQuestion.type === 'text' && (
                <div className={styles.textResponseContainer}>
                  <TextResponse handleResponseChange={saveAnswer} />
                </div>
              )}
            </div>

            <div className={styles.navigation}>
              <Button
                disabled={currentQuestionIndex === 0}
                secondary
                onClick={goToPreviousQuestion}
              >
                Previous
              </Button>
              {!currentQuestion.required && (
                <Button
                  disabled={currentQuestion.required}
                  secondary
                  onClick={goToNextQuestion}
                >
                  Skip
                </Button>
              )}
              <Button
                secondary
                onClick={handleNextButtonClick}
                disabled={responses[currentQuestionIndex] === null}
              >
                Next
              </Button>
            </div>
            <ProgressBar
              completed={currentQuestionIndex + 1}
              total={numWizardSteps}
            />
            <section>
              <h4 className={styles.questionTrackerHeader}>
                QUESTIONS ANSWERED
              </h4>
              <p className={styles.questionNumberTracker}>
                {currentQuestionIndex + 1}/{numWizardSteps}
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NewFeedback
