import { useState } from 'react'
import './App.css'

import PropsAndState from './components/PropsAndState'
import ContextApi from './components/ContextApi'
import ReduxToolkit from './components/ReduxToolkit'
import { Provider } from 'react-redux'
import { store } from './store'

enum ESlide {
  PropsAndState = 4,
  ContextApi = 5,
  ReduxToolkit = 7
}

function App() {
  const SlideToComponent: Record<ESlide, () => JSX.Element> = {
    [ESlide.PropsAndState]: () => <PropsAndState />,
    [ESlide.ContextApi]: () => <ContextApi />,
    [ESlide.ReduxToolkit]: () => (
      <Provider store={store}>
        <ReduxToolkit />
      </Provider>
    )
  }

  const SlideButtonLabel: Record<ESlide, string> = {
    [ESlide.PropsAndState]: 'Props and State',
    [ESlide.ContextApi]: 'Context API',
    [ESlide.ReduxToolkit]: 'Redux Toolkit',
  }

  const [currentSlide, setCurrentSlide] = useState<ESlide>(ESlide.PropsAndState)

  return (
    <>
      <nav>
        <h2>React Query Sharing Session</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          {
            Object.entries(SlideButtonLabel).map(([key, val]) => (
              <button
                key={key}
                disabled={currentSlide === key as unknown as ESlide}
                onClick={() => setCurrentSlide(key as unknown as ESlide)}
              >
                {val}
              </button>
            ))
          }
        </div>
      </nav>

      <main style={{ border: '1px solid white', padding: '16px 32px 32px', marginTop: 48 }}>
        {SlideToComponent[currentSlide]()}
      </main>
    </>
  )
}

export default App
