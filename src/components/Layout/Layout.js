import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default ({ children }) => {
  return (
    <div className="main">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
