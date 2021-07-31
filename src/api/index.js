import axios from 'axios'
import Config from '../../app.json'

var FormData = require('form-data');

const baseURL = Config.url

class APIHandler {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://5d5407c40e01.ngrok.io/api/v1/',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      }
    })
  }

  getIpClient = async () => {
    try {
      const response = await axios.get('https://ip.nf/me.json')
      return response.data.ip
    } catch (error) {
      return Promise.reject(error)
    }
  }

  getFormData = (params) => {
    const formData = new FormData()
    Object.keys(params).forEach(key => formData.append(key,params[key]))
    return formData
  }

  loginUser = async (params) => {
    try {
      const ip_response = await this.getIpClient()
      var data = new FormData();
      data.append('client_id', Config.client_id);
      data.append('client_secret', Config.client_secret);
      data.append('user[email]', 'nikhil@nighthack.in');
      data.append('user[password]', 'password');
      data.append('user[location]', '');
      const response = await this.axios.post('users/sign_in', data )
      return response.data
    } catch (e) {
      return Promise.reject(e)
    }
  }

  signUp = async (params) => {
    try {
      const data = JSON.stringify(params)
      const response = await this.axios.post('validateOtp', data)
      // this.access_token = await response.data.value.sessionToken
      return response.data
    } catch (e) {
      return Promise.reject(e)
    }
  }

  profileData = async (params) => {
    try{
      const response = await this.axios.get('users/me', { data: {access_token: params.access_token}} )
      console.log(response)
      return response.data
    } catch(error){
      console.log(error)
    }
  }

  profilesData = async (params) => {
    try{
      const response = await this.axios.get('users', { data: {access_token: params.access_token}} )
      console.log(response)
      return response.data
    } catch(error){
      console.log(error)
    }
  }

  getEvents = async (params) => {
    try{
      console.log(params)
      const response = await this.axios.get('events', { data: {access_token: params.access_token}} )
      console.log(response)
      return response.data
    } catch(error){
      console.log(error)
    }
  }
}

const API = new APIHandler()

export default API