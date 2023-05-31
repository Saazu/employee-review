import styles from './textResponse.module.css'
import * as React from 'react'

type Props = {
  handleResponseChange: (response: string) => void
  disabled?: boolean
  savedText?: string
}

const TextResponse = (props: Props) => {
  const { disabled = false, savedText, handleResponseChange } = props
  const [responseText, setResponsetext] = React.useState(
    savedText ? savedText : '',
  )

  function handleTextInput(event: React.FormEvent<HTMLTextAreaElement>) {
    setResponsetext(event.currentTarget.value)
    handleResponseChange?.(event.currentTarget.value)
  }

  return (
    <textarea
      disabled={disabled}
      className={styles.input}
      placeholder="Say something"
      value={responseText}
      onChange={handleTextInput}
    ></textarea>
  )
}

export default TextResponse
