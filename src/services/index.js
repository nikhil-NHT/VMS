import axios from "axios"
import globals from '../utils/global'
import { profileData } from '../api/index2'

export const getIpClient = async () => {
  try {
    const response = await axios.get('https://ip.nf/me.json')
    return response.data.ip
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchUserData = async () => {
  const response = await profileData({ access_token : globals.getCookie('user_cookie') })
  return response
}