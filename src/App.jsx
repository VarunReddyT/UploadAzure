import React from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Upload from "./Components/Upload.jsx"

function App() {

  return (
    <>  
      <Router>
        <Routes>
          <Route path="/" element={<Upload />} />
        </Routes>
      </Router>
    </>
  ) 
}

export default App
