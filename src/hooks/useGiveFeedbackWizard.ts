import * as React from 'react'
import { UserT } from '../context/types'
import {
  Answer,
  DispatchSubmissionContext,
  SubmissionContext,
  Response,
} from '../context/ResponseProvider'
import { Question2T, QuestionT } from '../context/QuestionProvider'
import deepClone from 'lodash.clonedeep'
import { useHistory } from 'react-router-dom'

function useGiveFeedbackWizard(
  giver: UserT,
  receiver: UserT,
  questions: (QuestionT | Question2T)[],
) {
  const { push } = useHistory()
  const responseDispatch = React.useContext(DispatchSubmissionContext)
  const allSubissions = React.useContext(SubmissionContext)
  const [answers, setAnswers] = React.useState<(Answer | null)[]>(
    new Array(questions.length).fill(null),
  )
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const currentQuestion = questions[currentQuestionIndex]
  const [submissionComplete, setSubmissionComplete] =
    React.useState<boolean>(false)

  function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevValue) => prevValue + 1)
    } else {
      setSubmissionComplete(true)
    }
  }

  function goToPreviousQuestion() {
    if (currentQuestionIndex !== 0) {
      setCurrentQuestionIndex((prevValue) => prevValue - 1)
    }
  }

  function skipQuestion() {
    saveResponse(currentQuestionIndex, {
      type: questions[currentQuestionIndex].type,
      answer: '',
    })
    goToNextQuestion()
  }

  function saveResponse(questionIndex: number, response: Response) {
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
      id: allSubissions.length + 1,
      giver,
      receiver,
      responses: deepClone(answers),
    }
    const updatedSummissions = [...allSubissions, newUserSubmission]
    responseDispatch({
      action: 'set',
      payload: updatedSummissions,
    })
    setSubmissionComplete(true)
  }

  React.useEffect(() => {
    if (submissionComplete) {
      completeSubmission()
      push('/share-feedback/complete')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionComplete])

  return {
    currentQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    saveResponse,
    skipQuestion,
    answers,
    numWizardSteps: questions.length,
    currentQuestionIndex,
  }
}

export default useGiveFeedbackWizard
