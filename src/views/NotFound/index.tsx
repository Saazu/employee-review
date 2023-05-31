import * as React from 'react'
import styles from './notFound.module.css'
import NotFound404 from '../../components/NotFound404/NotFound'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { AccountContext } from '../../context/AccountProvider'

const NotFound = () => {
  const currentUser = React.useContext(AccountContext)
  const isLoggedIn = currentUser != null

  return (
    <MainLayout loggedIn={isLoggedIn}>
      <div className={styles.notFound}>
        <NotFound404 />
      </div>
    </MainLayout>
  )
}

export default NotFound
