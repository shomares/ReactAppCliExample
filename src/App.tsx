import './App.scss'
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useEffect } from 'react'
import TodoPage from './pages/todo/todo'
import { useDispatch } from 'react-redux';
import { fetchToken } from './features/user.slice';
import LoginButton from './components/login-button';

function App() {
  const dispatcher = useDispatch()
  const { instance,  accounts } = useMsal()
  const isAuthenticated = useIsAuthenticated()
 
  useEffect(()=> {
    if(isAuthenticated){
      dispatcher(fetchToken({
        account : accounts[0],
        instance
      }))
    }
  }, [isAuthenticated])

  return (
    <div className="App">
      <div className="container">
        {isAuthenticated && <TodoPage />}
        {!isAuthenticated && <LoginButton/>}
        
      </div>
    </div>
  )
}

export default App
