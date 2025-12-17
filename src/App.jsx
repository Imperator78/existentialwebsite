import React, { useState } from 'react'
import './App.css'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3 from './components/Page3'
import Page7 from './components/Page7'
import Page8 from './components/Page8'
import Page14 from './components/Page14'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  
  const pages = [
    <Page1 key="page1" onNext={() => setCurrentPage(1)} />,
    <Page2 key="page2" onNext={() => setCurrentPage(2)} />,
    <Page3 key="page3" onNext={() => setCurrentPage(3)} />,
    <Page7 key="page7" onNext={() => setCurrentPage(4)} />,
    <Page8 key="page8" onNext={() => setCurrentPage(5)} />,
    <Page14 key="page14" onNext={() => setCurrentPage(0)} />
  ]

  return (
    <div className="App">
      {pages[currentPage]}
    </div>
  )
}

export default App
