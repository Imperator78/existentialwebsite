import React, { useState } from 'react'
import './App.css'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3 from './components/Page3'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  
  const pages = [
    <Page1 key="page1" onNext={() => setCurrentPage(1)} />,
    <Page2 key="page2" onNext={() => setCurrentPage(2)} />,
    <Page3 key="page3" onNext={() => setCurrentPage(0)} />
  ]

  return (
    <div className="App">
      {pages[currentPage]}
    </div>
  )
}

export default App
