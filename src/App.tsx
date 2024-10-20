import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppLayout from './components/AppLayout'
import { AppLayoutComponent } from './components/app-layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppLayoutComponent />
  )
}

export default App
