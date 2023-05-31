import * as React from 'react'
import { UserT } from './types'

export type Responses = {
  giver: UserT
  receiver: UserT
  responses: (ResponseT | Response2T)[]
}

export type ResponseT = {
  id: string
  type: 'scale' | 'text'
  required: boolean
  label: string
  answer: number | string
}

export type Response2T = {
  id: string
  required: boolean
  label: string
  type: 'multipleChoice'
  answer: number
}

type DispatchResponseContextT = any

export const DispatchResponseContext =
  React.createContext<DispatchResponseContextT | null>(null)
export const ResponseContext = React.createContext<(ResponseT | Response2T)[]>(
  [],
)

type SetResponsesT = {
  action: 'set'
  payload: Array<ResponseT | Response2T>
}

const reducer = (
  state: (ResponseT | Response2T)[],
  update: SetResponsesT,
): (ResponseT | Response2T)[] => {
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
