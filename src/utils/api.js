import axios from 'axios'

const API = {
  appID: 'ab49beaf',
  key: '50899e1faf51fd589ffe38f518bbef62',
  appID2: 'e76a0a27',
  key2: '862d196e7a97d07f163d025e57c79961'
}

const getRequestConfig = {
  headers: {
    'x-app-id': API.appID2,
    'x-app-key': API.key2
  },
  params: {
    branded: 'false'
  }
}

const postRequestConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'x-app-id': API.appID2,
    'x-app-key': API.key2
  }
}
export function makeGetFoodRequest(value) { 
  return axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}`, getRequestConfig)
    .then(res => res.data)
    .catch(err => {
      console.log("Error in makeGetFoodRequest", err)
    });
}

export function makeGetNutrientsRequest(value) { 
  return axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients/`, {'query':value} , postRequestConfig)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log("Error in makeGetNutritionRequest api", err)
    });
}
