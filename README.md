# Nutrition Planner 

## Final Project Submission

The nutritionplanner is an application where you can set your daily intake of calories consisting of fat, carbs and proteins. You can monitor and track your intake of these macronutrients by adding the foods you eat and in what amount. Similar to Lifesum, myFitnessPal etc. 

Made by William Westerlund & Philip Rumman

## Quick Start

### setup
`npm install`

### runs static http dev server
`npm start`

### example user - login information
email: willwest@gmail.com
password: will95

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

    /containers      Containers, smart components

    index.js    application entry point

    registerServiceWorker.js    In production, register a service worker to serve assets from local cache.

## Generate View Component
`yarn generate <COMPONENT_NAME> -r <ROUTE_NAME>`

example

`yarn generate orders -r myorders`

### *NOTE:*

*1) route name is optional, if not specified then route with same name as component will be created*

*2) you can also use `npm` instead of `yarn`*
