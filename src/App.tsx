import { useState } from 'react'
import './App.css'

import PropsAndState from './components/PropsAndState'
import ContextApi from './components/ContextApi'
import ReduxToolkit from './components/ReduxToolkit'
import QuickStartReactQuery from './components/QuickStartReactQuery'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

enum ESlide {
  PropsAndState = 4,
  ContextApi = 5,
  ReduxToolkit = 7,
  BasicReactQuery = 13,
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // staleTime: 1000 * 10, // Uncomment to test fresh data therefore no refetch
        // cacheTime: 1000 * 10, // Uncomment to test cache time when component unmounted
      }
    }
  })

  const SlideToComponent: Record<ESlide, () => JSX.Element> = {
    [ESlide.PropsAndState]: () => <PropsAndState />,
    [ESlide.ContextApi]: () => <ContextApi />,
    [ESlide.ReduxToolkit]: () => (
      <Provider store={store}>
        <ReduxToolkit />
      </Provider>
    ),
    [ESlide.BasicReactQuery]: () => (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <QuickStartReactQuery />
      </QueryClientProvider>
    )
  }

  const SlideButtonLabel: Record<ESlide, string> = {
    [ESlide.PropsAndState]: 'Props and State',
    [ESlide.ContextApi]: 'Context API',
    [ESlide.ReduxToolkit]: 'Redux Toolkit',
    [ESlide.BasicReactQuery]: 'BasicReactQuery',
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
