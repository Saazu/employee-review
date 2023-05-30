import styles from './textResponse.module.css'
import * as React from 'react'

type Props = {
  handleResponseChange?: (
    event: React.ChangeEventHandler<HTMLTextAreaElement>,
  ) => void
  response: string
  disabled?: boolean
}

const TextResponse = (props: Props) => {
  const { disabled = false, response } = props

  return (
    <textarea
      disabled={disabled}
      className={styles.input}
      placeholder="Say something"
      value={response}
    ></textarea>
  )
}

export default TextResponse
