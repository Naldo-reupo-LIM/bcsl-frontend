import { useState, useContext, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Login from '../../components/Login/Login'
import { Authentication } from '../../shared/api'
import EventsApi from '../../shared/api/endpoints/events'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import { useAuth } from '../../shared/hooks/useAuth'

export default function LoginPage(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false);
  const params = new URLSearchParams(window.location.search)
  const eventId = params.get('eventId')
  const { setLoginData } = useContext(AuthContext)
  const history = useHistory()
  const user = useAuth()

  const api = Authentication()

  const handleLoginClicked = async (userName: string, password: string) => {
    setLoading(true)
    try {
      const result = await api.login({ email: userName, password })
      const resultToken = await result.user.getIdToken()
      setLoading(false)
      window.localStorage.setItem('token', JSON.stringify(resultToken))
      setLoginData({
        isAuth: true,
        userUid: result.user.uid,
        email: result.user.email,
      })
      if (eventId) {
        const eventsApi = EventsApi()
        await eventsApi.addAttendees(eventId, {
          email: userName,
          password,
        })
      }
      handleRedirect(user.state)
    } catch (err) {
      console.error(err)
      setErrorMessage(true)
    }
  }
  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const user = await api.googleSignIn()

      if (user) {
        window.localStorage.setItem('token', JSON.stringify(user.token))
      }
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleRedirect = useCallback((userState) => {

    const { email, isAdmin } = userState
    let shouldRedirectTo = '/login'

    if (email) {
      shouldRedirectTo = isAdmin ? '/events/list' : '/'
    } else if (eventId) {
      shouldRedirectTo = `/event-info/${eventId}`
    }
    history.push(shouldRedirectTo)
  }, [eventId, history])

  useEffect(() => {
    handleRedirect(user.state)
  }, [handleRedirect, user.state])
    
  return (
      <Login
        onLogin={handleLoginClicked}
        googleOnLogin={handleGoogleLogin}
        loading={loading}
        errorMessage= {errorMessage}
      />
  )
}
