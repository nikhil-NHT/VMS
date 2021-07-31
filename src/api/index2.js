import axios from 'axios'
import Router from 'next/router'

export const login = async (params) => {
  const response = await axios.post('/api/login', { params: params })
  return response.data
}

export const signUp = async (params) => {
  const response = await axios.post('/api/signUp',{ params})
  return response.data
}

export const profileData = async (params) => {
  const response = await axios.post('/api/profileData',{ params })
  return response.data
}

export const getEvents = async (params) => {
  const response = await axios.post('/api/events',{ params })
  return response.data
}

