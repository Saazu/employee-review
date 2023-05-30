import * as React from 'react'
import { UserT } from '../context/types'

function useGiveFeedbackWizard(giver: UserT, receiver: UserT, questions: []) {
  const [responses, setResponses] = React.useState<(string | number)[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const currentQuestion = questions[currentQuestionIndex]

  function goToNextQuestion() {
    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prevValue) => prevValue + 1)
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex((prevValue) => prevValue - 1)
    }
  }

  function saveResponse(questionIndex: number, response: number | string) {
    const updatedResponse = {
      ...responses,
    }
    updatedResponse[questionIndex] = response
  }

  return {
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    saveResponse,
    responses,
    setResponses,
    numWizardSteps: questions.length,
  }
}

export default useGiveFeedbackWizard
