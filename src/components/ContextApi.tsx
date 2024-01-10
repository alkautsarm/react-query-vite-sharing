import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

const SecondChildWithoutContext = ({ value, setValue }: { value: string; setValue: Dispatch<SetStateAction<string>> }) => {
  return (
    <div style={{ paddingLeft: 32 }}>
      <p>
        <b>Second Child <i>without</i> Context</b>
      </p>
      <p>{value || '-'}</p>
      <input onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

const FirstChildWithoutContext = (props: { value: string; setValue: Dispatch<SetStateAction<string>> }) => {
  return (
    <div style={{ paddingLeft: 16 }}>
      <b>First Child <i>without</i> Context</b>
      <SecondChildWithoutContext {...props} />
    </div>
  )
}

const ParentWithoutContext = () => {
  const [parentText, setParentText] = useState('This is default value from ParentWithoutContext')

  return (
    <div style={{ textAlign: 'left' }}>
      <h3>ParentWithoutContext</h3>
      <FirstChildWithoutContext value={parentText} setValue={setParentText} />
    </div>
  )
}

const ParentContext = createContext({
  value: '',
  setValue: (val: string) => { console.log(val) },
})

const SecondChildWithContext = () => {
  const { value, setValue } = useContext(ParentContext)

  return (
    <div style={{ paddingLeft: 32 }}>
      <p>
        <b>Second Child <i>with</i> Context</b>
      </p>
      <p>{value || '-'}</p>
      <input onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}

const FirstChildWithContext = () => {
  return (
    <div style={{ paddingLeft: 16 }}>
      <b>First Child <i>with</i> Context</b>
      <SecondChildWithContext />
    </div>
  )
}

const ParentWithContext = () => {
  const [parentContextValue, setParentContextValue] = useState('This is default value from ParentWithContext')

  return (
    <div style={{ textAlign: 'left' }}>
      <ParentContext.Provider value={{ value: parentContextValue, setValue: setParentContextValue }}>
        <h3>ParentWithContext</h3>
        <FirstChildWithContext />
      </ParentContext.Provider>
    </div>
  )
}

const ContextApi = () => {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <ParentWithoutContext />
      <ParentWithContext />
    </div>
  )
}

export default ContextApi
