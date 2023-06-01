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

  console.log('Score', currentScore)

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

  return (
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
          style={{
            backgroundColor: `var(${backGroundColor(i + 1)})`,
            border: `1px solid var(${backGroundColor(i + 1)})`,
            width: `-webkit-fill-available`,
            minWidth: '35px',
          }}
          onMouseOver={handleHover}
          onClick={() => handleScoreSelect(i + 1)}
          value={i}
          key={i + 1}
          className={styles.box}
          disabled={viewOnly}
        ></button>
      ))}
    </div>
  )
}

export default Scale
