import * as React from 'react'
import { SubmissionContext } from '../context/ResponseProvider'
import { AccountContext } from '../context/AccountProvider'

function useSubmissions() {
  const currentUser = React.useContext(AccountContext)
  const allSumbissions = React.useContext(SubmissionContext)

  const feedbackRecived = allSumbissions.filter(
    (submission) => submission.receiver.id === currentUser?.id,
  )
  const feedBackGiven = allSumbissions.filter(
    (submission) => submission.giver.id === currentUser?.id,
  )

  const usersGivenFeedbackTo = allSumbissions
    .map((submission) => {
      if (submission.giver.id === currentUser?.id) {
        return submission.receiver.id
      }
      return null
    })
    .filter((user) => user !== null)

  const usersReceivedFeedbackFrom = allSumbissions
    .map((submission) => {
      if (submission.receiver.id === currentUser?.id) {
        return submission.giver.id
      }
      return null
    })
    .filter((user) => user !== null)

  return {
    feedBackGiven,
    feedbackRecived,
    usersGivenFeedbackTo,
    usersReceivedFeedbackFrom,
    numFeedbackGiven: feedBackGiven.length,
    numFeedbackReceived: feedbackRecived.length,
  }
}

export default useSubmissions
