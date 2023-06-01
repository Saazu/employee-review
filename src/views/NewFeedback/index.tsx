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
import { Response } from '../../context/ResponseProvider'

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
    answers,
  } = useGiveFeedbackWizard(giver, receiver, questions)

  function handleNextClick() {
    if (currentQuestionIndex + 1 === numWizardSteps) {
      completeSubmission()
      push('/share-feedback/complete')
    } else {
      goToNextQuestion()
    }
  }

  function saveAnswer(newResponse: Response | null) {
    saveResponse(currentQuestionIndex, newResponse)
  }

  function handleSkip() {
    saveAnswer({
      type: questions[currentQuestionIndex].type,
      answer: -1,
    })
    if (currentQuestionIndex + 1 === numWizardSteps) {
      completeSubmission()
      push('/share-feedback/complete')
    } else {
      goToNextQuestion()
    }
  }

  function formatSavedText(previousAnswer: Response | null) {
    if (!previousAnswer) {
      return ''
    } else {
      return String(previousAnswer.answer).trim()
    }
  }

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
                  selectedValue={Number(
                    answers[currentQuestionIndex]?.response?.answer,
                  )}
                  options={currentQuestion.options}
                  onOptionSelect={saveAnswer}
                />
              )}

              {currentQuestion.type === 'scale' && (
                <div className={styles.scaleInputContainer}>
                  <Scale
                    selectedScore={Number(
                      answers[currentQuestionIndex]?.response?.answer,
                    )}
                    onSelectScore={saveAnswer}
                  />
                </div>
              )}

              {currentQuestion.type === 'text' && (
                <div className={styles.textResponseContainer}>
                  <TextResponse
                    savedText={formatSavedText(
                      answers[currentQuestionIndex]?.response || null,
                    )}
                    handleResponseChange={saveAnswer}
                  />
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
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )}
              <Button
                secondary
                onClick={handleNextClick}
                disabled={
                  answers[currentQuestionIndex] === null ||
                  answers[currentQuestionIndex]?.response?.answer
                    .toString()
                    .trim() === ''
                }
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
