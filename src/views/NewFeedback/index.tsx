import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import styles from './newFeedback.module.css'
// import { QuestionContext } from '../../context/QuestionProvider'
import { useLocation, useHistory } from 'react-router-dom'
import MultipleChoiceQuestion from '../../components/MultipleChoiceQuestion/MultipleChoiceQuestion'
import Scale from '../../components/Scale/Scale'
import Button from '../../components/Button/Button'
import TextResponse from '../../components/TextResponse/TextResponse'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

type LocationState = {
  user: {
    id: string
    name: string
    avatarUrl: string
  }
}

const NewFeedback = () => {
  // const questions = React.useContext(QuestionContext)
  const { state } = useLocation<LocationState>()
  const { name, avatarUrl } = state.user
  const [response, setResponse] = React.useState('')
  const { push } = useHistory()

  function setText(event: Event) {
    const target = event.currentTarget as HTMLInputElement
    setResponse(target.value)
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            onClick={() => push('/share-feedback')}
            className={styles.backButton}
          >
            BACK
          </div>
          <div className={styles.header}>
            <div>
              <h2 className={styles.question}>
                How well did I display courage?
              </h2>
              <p className={styles.subTitle}>
                SHARE YOUR FEEDBACK FOR {name.toUpperCase()}
              </p>
            </div>
            <div>
              <User name={name} avatarUrl={avatarUrl} displayName={false} />
            </div>
          </div>
          <div className={styles.responseContainer}>
            <MultipleChoiceQuestion
              onOptionSelect={(e) => console.log('Selected', e)}
            />
            <Scale onSelectScore={(value) => console.log(value)} />
            <TextResponse response={response} />
            <div className={styles.navigation}>
              <Button secondary onClick={() => console.log('Previous')}>
                Previous
              </Button>
              <Button secondary onClick={() => console.log('Skip')}>
                Skip
              </Button>
              <Button secondary onClick={() => console.log('Next')}>
                Next
              </Button>
            </div>
            <ProgressBar color={'#1DDEBB'} completed={2} total={9} />
            <div>
              <p>QUESTIONS ANSWERED</p>
              <p>1/9</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NewFeedback
