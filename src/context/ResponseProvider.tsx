import * as React from 'react'
import { UserT } from './types'
import { QuestionT, Question2T } from './QuestionProvider'

export type Response = {
  type: 'scale' | 'text' | 'multipleChoice'
  answer: number | string
}

export type Answer = {
  response: Response | null
  question: QuestionT | Question2T
}

export type CompleteSubmission = {
  id: number
  giver: UserT
  receiver: UserT
  responses: Answer[]
}

type DispatchSubmissionContextT = any

export const DispatchSubmissionContext =
  React.createContext<DispatchSubmissionContextT | null>(null)
export const SubmissionContext = React.createContext<CompleteSubmission[]>([])

type SetSubmissionsT = {
  action: 'set'
  payload: CompleteSubmission[]
}

const reducer = (
  state: CompleteSubmission[],
  update: SetSubmissionsT,
): CompleteSubmission[] => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])

  return (
    <DispatchSubmissionContext.Provider value={dispatch}>
      <SubmissionContext.Provider value={state}>
        {children}
      </SubmissionContext.Provider>
    </DispatchSubmissionContext.Provider>
  )
}

export default UIProvider
