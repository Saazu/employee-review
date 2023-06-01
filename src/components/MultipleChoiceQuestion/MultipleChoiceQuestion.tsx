import * as React from 'react'
import styles from './multipleChoiceQuestion.module.css'
import { Response } from '../../context/ResponseProvider'

type Props = {
  selectedValue?: number
  options: {
    label: string
    value: number
  }[]
  onOptionSelect: (value: Response) => void
}

const MultipleChoiceQuestion = (props: Props) => {
  const { onOptionSelect, options, selectedValue } = props
  const [selectedOption, setSelectedOption] = React.useState<number>(
    selectedValue ? selectedValue : 0,
  )

  function handleOptionSelection(value: number) {
    const newResponse: Response = {
      type: 'multipleChoice',
      answer: value,
    }
    onOptionSelect(newResponse)
    setSelectedOption(value)
  }

  const backgroundColor = (value: number) => {
    if (selectedOption === 0) {
      return ' --lightGrey'
    } else {
      return selectedOption === value ? '--darkGrey' : '--lightGrey'
    }
  }

  const textColor = (value: number) => {
    if (selectedOption === 0) {
      return '--offBlack'
    } else {
      return selectedOption === value ? '--white' : '--offBlack'
    }
  }

  return (
    <div className={styles.container}>
      {options.map((option, i) => (
        <p
          style={{
            backgroundColor: `var(${backgroundColor(i + 1)})`,
            color: `var(${textColor(i + 1)})`,
          }}
          key={option.value}
          className={styles.option}
          onClick={() => handleOptionSelection(i + 1)}
        >
          {option.label}
        </p>
      ))}
    </div>
  )
}

export default MultipleChoiceQuestion
