import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { fetchTodos, addTodo, ITodo } from '../api'
import Spinner from './Spinner'
import { useState } from 'react'

const Todos = () => {
  const queryClient = useQueryClient()

  const query = useQuery('todos', fetchTodos)

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  if (query.isLoading || mutation.isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <ul style={{ paddingInlineStart: 0 }}>
        {query.data?.map((todo: ITodo) => (
          <li
            key={todo.id}
            style={{
              listStyle: 'none',
              background: 'white',
              color: '#1A1A1A',
              padding: 8,
              margin: 4,
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
      {query.isFetching && <p>Data is updating...</p>}

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: `New Todo ${(query.data?.length || 0) + 1}`,
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

const QuickStartReactQuery = () => {
  const [isTodosShown, setIsTodosShown] = useState(true)

  return (
    <div>
      {isTodosShown && <Todos />}

      <button
        style={{ width: '100%', marginTop: 32 }}
        onClick={() => setIsTodosShown(!isTodosShown)}
      >
        {isTodosShown ? 'Hide' : 'Show'} Todos
      </button>
    </div>
  )
}

export default QuickStartReactQuery