import {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import store from './app/store'
import { Provider } from 'react-redux'
import SuspenseContent from './containers/SuspenseContent';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<SuspenseContent loadingText='Loading' />}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
)
