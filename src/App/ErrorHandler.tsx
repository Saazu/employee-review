import * as React from 'react'
import NotFound from '../components/NotFound404/NotFound'

type Props = {
  children: React.ReactNode
}

type State = {
  error?: Error
}

export default class ErrorHandler extends React.Component<Props, State> {
  state = {
    error: undefined,
  }

  componentDidCatch(error: Error) {
    this.setState({ error })
  }

  render() {
    return this.state.error ? (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NotFound />
      </div>
    ) : (
      this.props.children
    )
  }
}
