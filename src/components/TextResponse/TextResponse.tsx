import * as React from 'react'
import styles from './textResponse.module.css'
import { NewAnswer } from '../../context/ResponseProvider'

type Props = {
  handleResponseChange: (response: NewAnswer) => void
  disabled?: boolean
  savedText?: string
}

const TextResponse = (props: Props) => {
  const { disabled = false, savedText, handleResponseChange } = props
  const [responseText, setResponsetext] = React.useState(
    savedText ? savedText : '',
  )

  function handleTextInput(event: React.FormEvent<HTMLTextAreaElement>) {
    const updatedText = event.currentTarget.value
    setResponsetext(updatedText)
    const newResponse: NewAnswer = {
      type: 'text',
      answer: updatedText.trim(),
    }
    handleResponseChange(newResponse)
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
