import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../store/counterSlice'

const ReduxToolkit = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <h3>Redux Toolkit</h3>
      <p>Counter: {count}</p>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
          style={{ marginRight: 8 }}
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default ReduxToolkit
