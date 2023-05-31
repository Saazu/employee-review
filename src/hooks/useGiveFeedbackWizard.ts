import * as React from 'react'
import { UserT } from '../context/types'
import {
  NewAnswer,
  DispatchResponseContext,
  ResponseContext,
} from '../context/ResponseProvider'

function useGiveFeedbackWizard(giver: UserT, receiver: UserT, questions: any) {
  const responseDispatch = React.useContext(DispatchResponseContext)
  const allSumbissions = React.useContext(ResponseContext)
  const [responses, setResponses] = React.useState<(NewAnswer | null)[]>(
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

  function saveResponse(questionIndex: number, response: NewAnswer) {
    const updatedResponse = [...responses]
    updatedResponse[questionIndex] = response
    setResponses(updatedResponse)
  }

  function completeSubmission() {
    const newUserSubmission = {
      giver,
      receiver,
      responses,
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
    responses,
    numWizardSteps: questions.length,
    currentQuestionIndex,
    completeSubmission,
  }
}

export default useGiveFeedbackWizard
