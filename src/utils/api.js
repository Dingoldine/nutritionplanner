import axios from 'axios'

const API = {
  appID: 'ab49beaf',
  key: '50899e1faf51fd589ffe38f518bbef62'
}

const requestConfig = {
  headers: {
    'x-app-id': API.appID,
    'x-app-key': API.key
  },
  params: {
    branded: 'false'
  }
}

export function makeGetNutritionRequest(value) {
  axios
    .get(`https://trackapi.nutritionix.com/v2/search/instant?query=${value}`, requestConfig)
    .then(res => res)
    .catch(err => {
      console.log(err)
      console.log('Error in makeGetNutritionRequest')
    })
}
