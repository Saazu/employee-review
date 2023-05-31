import styles from './noFeedbackContainer.module.css'

const NoFeedbacDisplay = () => {
  return (
    <div className={styles.container}>
      <h2>No feedback to display 🔮</h2>
      <p>
        There is no feedback to display at this time – check back in a bit!{' '}
      </p>
    </div>
  )
}

export default NoFeedbacDisplay
