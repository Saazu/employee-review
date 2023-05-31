import * as React from 'react'
import { UserT } from './types'

export type NewAnswer = {
  type: 'scale' | 'text' | 'multipleChoice'
  answer: number | string
}

export type Submission = {
  giver: UserT
  receiver: UserT
  answers: NewAnswer[]
}

type DispatchResponseContextT = any

export const DispatchResponseContext =
  React.createContext<DispatchResponseContextT | null>(null)
export const ResponseContext = React.createContext<Submission[]>([])

type SetResponsesT = {
  action: 'set'
  payload: Submission[]
}

const reducer = (state: Submission[], update: SetResponsesT): Submission[] => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('responses', state)

  return (
    <DispatchResponseContext.Provider value={dispatch}>
      <ResponseContext.Provider value={state}>
        {children}
      </ResponseContext.Provider>
    </DispatchResponseContext.Provider>
  )
}

export default UIProvider
