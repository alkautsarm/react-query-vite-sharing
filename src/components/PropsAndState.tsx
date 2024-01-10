import { useState } from "react"

const Children = ({ value }: { value: string }) => {
  return (
    <p>{ value }</p>
  )
}

const ParentWithoutState = () => {
  let counter = 1

  return (
    <div>
      <h3>Without <i>useState</i></h3>

      <Children value={`This is children counter: ${counter}`} />

      <div>
        <button onClick={() => counter++} style={{ marginRight: 16 }}>Increment</button>
        <button onClick={() => counter--}>Decrement</button>
      </div>
    </div>
  )
}

const ParentWithState = () => {
  const [counter, setCounter] = useState(1)
  return (
    <div>
      <h3>With <i>useState</i></h3>

      <Children value={`This is children counter: ${counter}`} />

      <div>
        <button onClick={() => setCounter(counter + 1)} style={{ marginRight: 16 }}>Increment</button>
        <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      </div>
    </div>
  )
}

const PropsAndState = () => {
 return (
  <div style={{ display: 'flex', gap: 28 }}>
    <ParentWithoutState />
    <ParentWithState />
  </div>
 )
}

export default PropsAndState
