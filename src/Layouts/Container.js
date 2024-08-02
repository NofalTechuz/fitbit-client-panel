import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Container = ({children}) => {
  return (
    <>
        <Sidebar />
        <div className="content">
          <Navbar/>
          <div>
            <main>
              {children}
            </main>
          </div>
        </div>
    </>
  )
}

export default Container