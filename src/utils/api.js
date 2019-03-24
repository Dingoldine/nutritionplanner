import axios from 'axios'

const API = {
  appID: 'ab49beaf',
  key: '50899e1faf51fd589ffe38f518bbef62'
}

const getRequestConfig = {
  headers: {
    'x-app-id': API.appID,
    'x-app-key': API.key
  },
  params: {
    branded: 'false'
  }
}

const postRequestConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'x-app-id': API.appID,
    'x-app-key': API.key
  }
}
export function makeGetFoodRequest(value) { 
  return axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}`, getRequestConfig)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
      console.log("Error in makeGetNutritionRequest")
    });
}

export function makeGetNutrientsRequest(value) { 
  return axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients/`, {'query':value} , postRequestConfig)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
      console.log("Error in makeGetNutritionRequest")
    });
}
