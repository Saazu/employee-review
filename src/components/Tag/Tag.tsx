import styles from './tag.module.css'

type Props = {
  text: string
  backgroundColor: string
  textColor: string
}

const Tag = (props: Props) => {
  const { text, backgroundColor, textColor } = props

  return (
    <span
      className={styles.tag}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
        textTransform: 'uppercase',
      }}
    >
      {text}
    </span>
  )
}

export default Tag
