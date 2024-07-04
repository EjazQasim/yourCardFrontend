import { useGetMeQuery, useLoginMutation, useRegisterMutation } from 'src/store/auth'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext({} as any)

const AuthProvider = ({ children }: any) => {
  const router = useRouter()

  const [user, setUser] = useState<any>() // Provide the type explicitly.

  const { data, isLoading, refetch } = useGetMeQuery(
    {},
    {
      skip: typeof localStorage !== 'undefined' ? !localStorage.getItem('user') : true
    }
  )

  const [login] = useLoginMutation()
  const [register] = useRegisterMutation()

  useEffect(() => {
    if (data) {
      setUser(data)
    } else if (!isLoading) {
      setUser(null)
    }
  }, [data, isLoading])

  const handleLogin = async (params: any) => {
    try {
      const res: any = await login(params).unwrap()
      setUser(res.user)
      localStorage.setItem('user', JSON.stringify(res.user))
      localStorage.setItem('tokens', JSON.stringify(res.tokens))
      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL as string)
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const handleRegister = async (params: any) => {
    try {
      const res: any = await register(params).unwrap()
      setUser(res.user)
      localStorage.setItem('user', JSON.stringify(res.user))
      localStorage.setItem('tokens', JSON.stringify(res.tokens))
      router.replace('/auth/register/steps')
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('tokens')
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  const values = {
    user,
    refetch,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
