import { useState } from 'react'
import { InputTodo } from './todo/InputTodo'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InputTodo count={count}/>
    </>
  )
}

export default App
