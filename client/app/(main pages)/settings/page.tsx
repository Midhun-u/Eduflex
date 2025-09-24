import React from 'react'
import styles from '../../../styles/pages/settings.module.scss'
import SettingsSection from '@/components/settings/SettingsSection'

const page = () => {

  return (

    <main className={styles['container']}>
      <SettingsSection />
    </main>

  )
}

export default page