import React from 'react'
import Footer from './footer'
import Navbar from './navbar/navbar'

export default props => {
  return (
    <div className="main">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  )
}
