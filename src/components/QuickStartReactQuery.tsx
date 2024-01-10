import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { fetchTodos, addTodo, ITodo } from '../api'
import Spinner from './Spinner'

const Todos = () => {
  const queryClient = useQueryClient()

  const query = useQuery('todos', fetchTodos)

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  if (query.isLoading || query.isFetching || mutation.isLoading) {
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

export default Todos
