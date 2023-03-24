import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostList from './components/PostList'
import AddPostForm from './components/AddPostForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="App">
      <AddPostForm />
      <PostList />
    </main>
  )
}

export default App
