type Props = {
  color?: string
  completed: number
  total: number
}

const ProgressBar = (props: Props) => {
  const { color, completed, total } = props

  const containerStyles = {
    width: '100%',
    height: '5px',
    backgroundColor: '#F2F3F4',
    borderRadius: 50,
    margin: '1rem 0rem',
  }

  const fillerStyles = {
    height: '100%',
    width: `${(completed / total) * 100}%`,
    backgroundImage: color ? color : `linear-gradient(#1DDEBB, #98FFFB)`,
    borderRadius: 'inherit',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  )
}

export default ProgressBar
