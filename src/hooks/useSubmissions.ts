import * as React from 'react'
import { ResponseContext } from '../context/ResponseProvider'
import { AccountContext } from '../context/AccountProvider'

function useSubmissions() {
  const currentUser = React.useContext(AccountContext)
  const allSumbissions = React.useContext(ResponseContext)
  const feedbackRecived = allSumbissions.filter(
    (submission) => submission.receiver.id === currentUser?.id,
  )
  const feedBackGiven = allSumbissions.filter(
    (submission) => submission.giver.id === currentUser?.id,
  )

  const usersGivenFeedbackTo = allSumbissions.map((submission) => {
    if (submission.giver.id === currentUser?.id) {
      return submission.giver.id
    }
  })

  const usersReceivedFeedbackFrom = allSumbissions.map((submission) => {
    if (submission.receiver.id === currentUser?.id) {
      return submission.giver.id
    }
  })

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
