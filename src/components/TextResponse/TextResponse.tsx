import * as React from 'react'
import styles from './textResponse.module.css'
import { Response } from '../../context/ResponseProvider'

type Props = {
  handleResponseChange: (response: Response) => void
  disabled?: boolean
  savedText?: string | null | number
}

const TextResponse = (props: Props) => {
  const { disabled = false, savedText, handleResponseChange } = props
  const [responseText, setResponsetext] = React.useState(
    !savedText || savedText === -1 ? '' : savedText,
  )

  function handleTextInput(event: React.FormEvent<HTMLTextAreaElement>) {
    const updatedText = event.currentTarget.value
    setResponsetext(updatedText)
    const newResponse: Response = {
      type: 'text',
      answer: updatedText.trim(),
    }
    handleResponseChange(newResponse)
  }

  return (
    <textarea
      aria-label="Text response"
      disabled={disabled}
      className={styles.input}
      placeholder="Say something"
      aria-placeholder="Say something"
      aria-multiline="true"
      value={responseText?.toString()}
      onChange={handleTextInput}
      required
      autoFocus
    ></textarea>
  )
}

export default TextResponse
