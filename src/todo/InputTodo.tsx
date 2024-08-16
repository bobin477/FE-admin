import { useState } from "react"

interface Props{
  count: number
}

export const InputTodo = (props: Props) => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState<string[]>([])


  const handleClick = () =>{
    setTodos((prev=>{
      return [...prev, todo]
    }))
    setTodo("")
  }

  return (
    <div>
      <div>todo + {props.count} </div>
      <input value={todo} type="text" onChange={(event)=>{
          setTodo(event.target.value)
      }}/>
      <button onClick={() => handleClick()}>click</button>

    
       {todos.map(
         (todo, item) => <li key={item}>
           {todo}
         </li>
       )}
    </div>
  )
}
