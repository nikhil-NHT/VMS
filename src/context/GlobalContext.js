import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { LOGIN_USER, LOGOUT_USER, DEFAULT, EVENTS, UPDATE_EVENTS, SUCCESS } from './actionTypes'

const initialState = {
  isAuth: false,
  profileData: {},
  categories:[
    {
      "name": "Health Service",
      "id": "6104146fcd75c641fd189e5d"
    },
    {
      "name": "Yoga Session",
      "id": "6104146fcd75c641fd189e5e"
    },
    {
      "name": "Emergencies",
      "id": "6104146fcd75c641fd189e5f"
    },
    {
      "name": "Environment",
      "id": "6104146fcd75c641fd189e60"
    },
    {
      "name": "Animal Welfare",
      "id": "6104146fcd75c641fd189e61"
    },
    {
      "name": "Social Service",
      "id": "6104146fcd75c641fd189e62"
    }
  ],
  events: null,
  displayResponse: false
}

const reducer = (state, payload) => {
  switch (payload.action) {
    case LOGIN_USER:
      return {
        ...state,
        isAuth: true,
        profileData: {...payload.payload},
      }
    case LOGOUT_USER:
      globals.removeCookie('user_cookie')
      return initialState
    case EVENTS:
      return {
        ...state,
        events: payload.payload
      }
    case UPDATE_EVENTS:
      return {
        ...state,
        events: [...state.events, ...payload.events]
      }
    case SUCCESS:
      return{
        ...state,
        displayResponse: payload.displayResponse
      }
    default:
      return state
  }
}

export const GlobalContext = createContext()

export const Provider = ({ children }) => {
  const [userData, setUserData] = useReducer(reducer, initialState)
  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any
}