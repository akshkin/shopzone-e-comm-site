import React from 'react'
import Footer from '../footer/footer.component'
import Header from '../header/header.component'
import { Outlet } from "react-router-dom"
import { StyledLayout } from './layout.styles'

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </StyledLayout>
  )
}

export default Layout