import styles from './multipleChoiceQuestion.module.css'

type Props = {
  options?: {
    label: string
    value: number
  }[]
  onOptionSelect: (value: number) => void
}

const MultipleChoiceQuestion = (props: Props) => {
  const { onOptionSelect } = props

  return (
    <div>
      <p className={styles.option} onClick={() => onOptionSelect(1)} key={1}>
        Please Improve You may have done one or the following: Maybe you were
        mostly quiet in meetings and when you had something on your mind, you
        brought it to the team afterward. Or, you had feedback that would be
        valuable to go, but you found it too difficult. Or, you had an
        opportunity to grow by doing something uncomfortable but you didn’t.
      </p>
      <p className={styles.option} onClick={() => onOptionSelect(1)} key={2}>
        You Were Good You sometimes participate in meetings but you feel that
        they don’t always bring up important things when they should.{' '}
      </p>
      <p className={styles.option} onClick={() => onOptionSelect(1)} key={3}>
        You Were Great I and others can count on your courage to help the team
        do what is right.
      </p>
    </div>
  )
}

export default MultipleChoiceQuestion
