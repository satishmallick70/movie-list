import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Movies from './container/movies'
import AddMovie from './components/AddMovie'
export default function App() {
  return (
    <div>
      <Header/>
      <Movies/>
      <AddMovie/>
      <Footer/>
    </div>
  )
}
