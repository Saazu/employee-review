import * as React from 'react'

export type QuestionT = {
  id: string
  type: 'scale' | 'text'
  required: boolean
  label: string
}

export type Question2T = {
  id: string
  required: boolean
  label: string
  type: 'multipleChoice'
  options: {
    label: string
    value: number
  }[]
}

type DispatchQuestionContextT = any

export const DispatchQuestionContext =
  React.createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = React.createContext<(QuestionT | Question2T)[]>(
  [],
)

type SetQuestionsT = {
  action: 'set'
  payload: Array<QuestionT | Question2T>
}

const reducer = (
  state: (QuestionT | Question2T)[],
  update: SetQuestionsT,
): (QuestionT | Question2T)[] => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>
        {children}
      </QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
