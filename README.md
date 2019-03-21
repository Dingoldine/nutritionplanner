# Nutrition Planner 

## Quick Steps

### setup
`yarn install`

### runs static http dev server
`yarn start`

### Create production build
`yarn build`

## Generate View Component
`yarn generate <COMPONENT_NAME> -r <ROUTE_NAME>`

example

`yarn generate orders -r myorders`

### *NOTE:*

*1) route name is optional, if not specified then route with same name as component will be created*

*2) you can also use `npm` instead of `yarn`*


#MID PROYECT SUBMISSION 

The nutritionplanner once finished will be an application where you can set your daily calorie, fat and protein etc. intake and track you progress by adding what you eat. Similar to lifesum, myFitnessPal etc. 

#What We have Done
We have set up the authentication with FireBase, We have created a page to Sign Up that stores a new user in Firestore and a view to sign in with existing users.
The application state (authentication) is saved in redux store.  
We have implemented a Home screen where you can perform an API call using the search field. This will return a selection of food items based on the search term. 
You can also navigate using the navbar that uses react router to go to new locations. 
Lastly there is a Profile view that fetches your user settings from Firestore and you can also update your settings and save them to Firestore. 

#What We Will Do 
We will update the UI and design of all components. As of now, the CSS is very basic Bootstrap. No customization. 
We will implement more database interaction, show daily summaries of nutrition intake and compare to the user settings to let user know 
if the targets are reached. The items displayed in the search can not yet be added {logged as eaten and added to daliy cal,protein intake etc} this will be implemented shorly.  

#File Structure
Deployement and Database files 
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
