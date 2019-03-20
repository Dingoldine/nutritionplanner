import {
    API
} from '../../app/apikey'


export const REQUEST_FOOD = 'REQUEST_FOOD';
export const RECEIVE_FOOD = 'RECEIVE_FOOD';


export const requestFood = () => ({
    type: REQUEST_FOOD,
});

export const receivedFood = json => ({
    type: RECEIVE_FOOD,
    json: json.articles,
});

//  Fetch works, Dispatching does not yet
export function fetchFood(searchTerm) {
    const ingredients = encodeURIComponent(searchTerm);
    //  dispatch(requestFood());
    fetch(`https://api.edamam.com/api/food-database/parser?ingr=${ingredients}&app_id=${API.appID}&app_key=${API.key}`)
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error),
    )
    .then((json) => {
        console.log(json)
        console.log(json.parsed)
        console.log(json.hints)
        //  dispatch(receivedFood(json));
    }, 
    );
}