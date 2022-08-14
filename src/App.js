import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { install } from '@layer0/prefetch/window'
import installDevtools from '@layer0/devtools/install'

const App = () => {
  useEffect(() => {
    // Enable service worker inside the window
    install()
    // Enable devtools manually, instead of relying on defaults by Layer0
    installDevtools()
  }, [])
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
    </Fragment>
  )
}

export default App
