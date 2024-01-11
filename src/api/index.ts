export interface ITodo {
  id: number
  title: string
}

export const fetchTodos = async () => {
  const response = await fetch('http://localhost:3004/todos', {
    method: 'get',
  })

  if (response.ok) {
    return response.json()
  }

  throw new Error('Something bad happen')
}

export const addTodo = async (todo: ITodo) => {
  const response = await fetch('http://localhost:3004/todos', {
    method: 'post',
    body: JSON.stringify(todo),
  })

  if (response.ok) {
    return response.json()
  }

  throw new Error('Something bad happen')
}

