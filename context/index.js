import axios from "axios";
import { useReducer, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// initial state
const initialState = {
  user: null
}

// create context
const Context = createContext()

// root reducer
const rootReducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    default:
      return state
  }
}

// context provider
const Provider = ({children}) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  const router = useRouter()

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user"))
    })
  }, [])

  axios.interceptors.response.use(
    function(response) {
      // any status code that lie within the range of 2xx cause this function
      // to trigger 
      return response
    },
    function(error) {
      // any status codes that falls outside the range of 2xx cause this function
      // to trigger
      let res = error.response
      if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios.get("http://localhost:3001/logout")
          .then((data) => {
            console.log('/401 error > logout')
            dispatch({ type: "LOGOUT" })
            window.localStorage.removeItem("user")
            router.push('/login')
          })
          .catch(err => {
            console.log('AXIOS INTERCEPTROS ERR', err)
            reject(error)
          })
        })
      }
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get("http://localhost:3001/csrf-token")
      // console.log('csrf', data)
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken
    }
    getCsrfToken()
  }, [])

  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }