import * as React from 'react'
import styles from './scale.module.css'
import { Response } from '../../context/ResponseProvider'

type Props = {
  maxValue?: number
  selectedScore?: number
  onSelectScore?: (score: Response) => void
  viewOnly?: boolean
}

const Scale = (props: Props) => {
  const {
    maxValue = 10,
    onSelectScore,
    selectedScore,
    viewOnly = false,
  } = props
  const [scoreHoverOn, setScoreHoverOn] = React.useState<number>(0)
  const [currentScore, setCurrentScore] = React.useState<number>(
    selectedScore ? selectedScore : 0,
  )

  function handleHover(event: React.MouseEvent<HTMLButtonElement>) {
    setScoreHoverOn(Number(event.currentTarget.value) + 1)
  }

  function handleMouseLeave() {
    setScoreHoverOn(0)
  }

  function handleScoreSelect(value: number) {
    const newResponse: Response = {
      type: 'scale',
      answer: value,
    }
    setCurrentScore(value)
    onSelectScore?.(newResponse)
  }

  const backGroundColor = (value: number) => {
    if (currentScore) {
      return currentScore > value - 1 ? '--primaryColor' : '--disabledColor'
    } else if (scoreHoverOn > 0) {
      return scoreHoverOn > value - 1 ? '--primaryColor' : '--disabledColor'
    } else {
      return '--disabledColor'
    }
  }

  function handleEnterKeyPress(event: React.KeyboardEvent, value: number) {
    if (event.key === 'Enter') {
      handleScoreSelect(value)
    }
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${maxValue}, 1fr)`,
          gap: '2px',
        }}
        onMouseLeave={handleMouseLeave}
      >
        {new Array(maxValue).fill(0).map((_, i) => (
          <button
            type="button"
            id="setScore"
            aria-label={(i + 1).toString()}
            style={{
              backgroundColor: `var(${backGroundColor(i + 1)})`,
              border: `1px solid var(${backGroundColor(i + 1)})`,
              width: `-webkit-fill-available`,
              minWidth: '35px',
            }}
            onMouseOver={handleHover}
            onClick={() => handleScoreSelect(i + 1)}
            onKeyDown={(event) => handleEnterKeyPress(event, i + 1)}
            value={i}
            key={i + 1}
            className={styles.box}
            disabled={viewOnly}
            tabIndex={0}
          ></button>
        ))}
      </div>
      <div className={styles.scoreDisplay}>
        <p>
          {currentScore ? selectedScore : 0}/{maxValue}
        </p>
      </div>
    </>
  )
}

export default Scale
