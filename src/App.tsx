import React, { useRef, useState, useEffect } from 'react'

const App:React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [list, setList] = useState<string[]>([])

    const addTodo = () => {
        setList([...list, inputRef.current!.value])
        localStorage.setItem('todos', JSON.stringify([...list, inputRef.current!.value]))
        inputRef.current!.value = ''
    }

    const removeTodo = (item: string) => {
        const newTodos = list
        newTodos.splice(newTodos.findIndex(data => data === item), 1)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        setList([...newTodos]) 
    }

    useEffect(() => {
        const lsTodos = localStorage.getItem('todos')
        setList(lsTodos ? JSON.parse(lsTodos) : [])
    }, [])
  
    return(

        <>
        
            <input ref = {inputRef} type = "text" />
            <button onClick = {addTodo}> Adicionar </button>

            {list && list.map((data, index) => (
                <div key = {index}>
                    <h1> {data} </h1>
                    <button onClick = {() => removeTodo(data)}> Remover </button>
                </div>
            ))}
        
        </>

    )

}

export default App;
