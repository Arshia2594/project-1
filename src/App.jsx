import React from 'react'
import Header from './components/ui/Header'

const App = () => {
  return (
    <div className='p-6 space-y-8'>

      <Header
      title="Dashboard"
      subtitle="Welcome to control panel"
      variant="h1"
      align="left"
      />

      <Header
      title="Employee List"
      subtitle="All Ragister Employee Shown Here"
      variant="h2"
      align="center"
      />

      <Header
      title="Setting"
      subtitle="Manage Application Preferences"
      variant="h3"
      align="right"
      />
      
    </div>
  )
}

export default App
