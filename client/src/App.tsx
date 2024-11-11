import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import { useAppStore } from './store'
import { getUserData } from './hooks/getUserData'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'

interface RouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: RouteProps) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children }: RouteProps) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children
}
''

function App() {
  const { userInfo, setUserInfo } = useAppStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserData,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      setUserInfo(null)
    }

    if (data) {
      setUserInfo(data);
    }
  }, [data, isError, setUserInfo]);


  if (isLoading) {
    return <div>Carregando...</div>
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={
          <AuthRoute>
            <Auth />
          </AuthRoute>} />

        <Route path='/chat' element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>} />

        <Route path='/profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>} />

        <Route path='*' element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
