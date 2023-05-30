import styles from './scale.module.css'

type Props = {
  maxValue?: number
  onSelectScore: (score: number) => void
}

const Scale = (props: Props) => {
  const { maxValue = 10, onSelectScore } = props

  return (
    <div className={styles.wrapper}>
      {new Array(maxValue).fill(0).map((_, i) => (
        <button
          onClick={() => onSelectScore(i)}
          value={i}
          key={i}
          className={styles.box}
        ></button>
      ))}
    </div>
  )
}

export default Scale
