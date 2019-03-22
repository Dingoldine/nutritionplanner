# Nutrition Planner 

## Mid Project Submission

The nutritionplanner once finished will be an application where you can set your daily intake of calories consisting of fat, carbs and proteins. You can monitor and track your intake of these macronutrients by adding the foods you eat and in what amount. Similar to Lifesum, myFitnessPal etc. 

## What We Have Done
We have set up the authentication and authorization using FireBase. We have created a page to Sign Up that stores a new user in Firestore and a view to sign in with existing users. The application state (authentication) is saved in redux store.  
We have implemented a Home screen where you can perform API calls using the search field. This will return a selection of food items based on the search term. 
You can also navigate using the navbar that uses react router to go to new locations.
Lastly there is a Profile view that fetches your user settings from Firestore and you can also update your settings and save them to Firestore. 

## What We Will Do 
We will update the UI and design of all components. As of now, the CSS is very basic Bootstrap. Minor customization. 
We will implement more database interaction, show daily summaries of nutrition intake and compare to the user settings to let user know 
if the targets are reached. Basically connecting the views and logged foods. The items displayed in the search can not yet be added {logged as eaten and added to daliy cal,protein intake etc} this will be implemented shorly as well as the visual representation of how much you've eaten etc. 

## File Structure
Deployment and Database files 
/functions
.firebase
yarn.lock 
storage.rules 
firebase.json 
database.rules.json
firebaserc
firestore.rules

eslintrc.json  Linter settings 

/public
application entry point 

/generators
generates components

Npm 
/node_modules 
package.json 
package-lock.json

Application 
/src 
    /config     settings 
    
    /firebase   firebase deployement and database
    
    /session    maintaining session
    
    /components stateless components, gets fed props

    /images     contains images

    /utils      axios instance settings

    /views      Containers, smart components

    index.js    application entry point

    registerServiceWorker.js    In production, register a service worker to serve assets from local cache.

## Quick Steps

### setup
`npm install`

### runs static http dev server
`npm start`

## Generate View Component
`yarn generate <COMPONENT_NAME> -r <ROUTE_NAME>`

example

`yarn generate orders -r myorders`

### *NOTE:*

*1) route name is optional, if not specified then route with same name as component will be created*

*2) you can also use `npm` instead of `yarn`*
