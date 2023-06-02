import * as React from 'react'
import { UserT } from '../context/types'
import {
  Answer,
  DispatchSubmissionContext,
  SubmissionContext,
  Response,
} from '../context/ResponseProvider'
import { Question2T, QuestionT } from '../context/QuestionProvider'

function useGiveFeedbackWizard(
  giver: UserT,
  receiver: UserT,
  questions: (QuestionT | Question2T)[],
) {
  const responseDispatch = React.useContext(DispatchSubmissionContext)
  const allSumbissions = React.useContext(SubmissionContext)
  const [answers, setAnswers] = React.useState<(Answer | null)[]>(
    new Array(questions.length).fill(null),
  )
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const currentQuestion = questions[currentQuestionIndex]

  function goToNextQuestion() {
    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  function saveResponse(questionIndex: number, response: Response | null) {
    const newAnswer: Answer = {
      response: response,
      question: questions[questionIndex],
    }
    const updatedResponse = [...answers]
    updatedResponse[questionIndex] = newAnswer
    setAnswers(updatedResponse)
  }

  function completeSubmission() {
    const newUserSubmission = {
      id: allSumbissions.length + 1,
      giver,
      receiver,
      responses: answers,
    }
    const updatedSummissions = [...allSumbissions, newUserSubmission]
    responseDispatch({
      action: 'set',
      payload: updatedSummissions,
    })
  }

  return {
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    saveResponse,
    answers,
    numWizardSteps: questions.length,
    currentQuestionIndex,
    completeSubmission,
  }
}

export default useGiveFeedbackWizard
