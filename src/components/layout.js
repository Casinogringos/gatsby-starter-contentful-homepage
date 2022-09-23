import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import Head from "./head"
import "../styles.css"
import "../main.scss"

const Layout = (props) => {
  return (
    <>
      <Head {...props} />
      <Header />
      {props.children}
      <Footer />
    </>
  )
}

export default Layout
