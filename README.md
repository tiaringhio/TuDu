<!-- PROJECT LOGO -->
  <br />
    <p align="center">
  <a href="https://github.com/tiaringhio/TuDu">
    <img src="src\components\todo.png" alt="Logo" width="130" height="130">
  </a>
  <h1 align="center">TuDu </h1>
  <p align="center">
    A simple To-Do Web App written in React powered by Firebase and Cloud Firestore.
  </p>
  <p align="center">
    <a href="https://tiaringhiotudu.netlify.com/" target="_blank" align="center">Live Demo</a>
  </p>
  
  <!-- TABLE OF CONTENTS -->
  ## Table of Contents
  
  - [Table of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
  - [Installation](#installation)
    - [Bootstrap](#bootstrap)
    - [Splash Screen](#splash-screen)
    - [Color picker](#color-picker)
    - [DateTime Picker](#date-picker)
    - [Firebase](#firebase)
    - [Moment.js](#moment.js)
    - [Fontawesome](#fontawesome)
    - [Depcheck](#depcheck)
  - [Features](#features)
    - [Add Item](#add-item)
    - [Categories](#categories)
    - [Item Management](#item-management)
    - [Colors](#colors)
    - [DateTime](#datetime)
  - [Authentication](#authentication)
  - [Database](#database)
  - [Test & Deploy](#test--deploy-)
  - [License](#license)
   <!-- ABOUT THE PROJECT -->

## About The Project

**TuDu** is a simple To-Do List Web App written in **React**, a JavaScript framework created by the smart folks at Facebook, it uses **Firebase** for authentication and **Cloud Firestore** for the database and some really cool packages powered by the npm and GitHub community.

## Installation

This project uses some very useful npm dependencies createad by the React community, here's which dependency is used and how to install:

### Bootstrap

[react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)

This package is needed to use Bootstrap with React, all components are available with minimal to no adjustments.

`npm install react-bootstrap bootstrap`

### Splash screen

[react-welcome-page](https://github.com/utarit/react-welcome-page)

This is used to create the awesome splashscreen you see when loading the app, it's fully customizable inside the `splashScreen` component, you can follow the likn's instruction.

`npm install --save react-welcome-page`

### Color picker

[react-color](https://github.com/casesandberg/react-color/)

This is used to add the color picker to the app, it allows the user to change the card's background color. It's fully customizable, there's a lot of picker style to choose from.

`npm install react-color --save`

### Date Picker

[react-datepicker](https://github.com/Hacker0x01/react-datepicker/)

Use to set a time to a task, it'very customizable. Used with Moment.js to convert the date to a specific format.

`npm install react-datepicker --save`

### Firebase

[firebase](https://firebase.google.com/)

The application works thank to Firebase, the platform created by Google offers authentication via the major providers such as Google, Facebook GitHub and many others (i chose to use Google for ease of use). Cloud Firestore is a NoSQL, document-oriented database.

`npm install --save firebase`

### Moment.js

[react-moment](https://github.com/headzoo/react-moment)

Used to convert Firestore timestamps in legible format.

`npm install --save moment react-moment`

### Fontawesome

[react-fontawesome](https://github.com/FortAwesome/react-fontawesome)

Just some icons, nothing more, nothing less.

`npm i --save @fortawesome/fontawesome-svg-core`

`npm i --save @fortawesome/free-solid-svg-icons`

`npm i --save @fortawesome/react-fontawesome`

### Depcheck

[depcheck](https://github.com/depcheck/depcheck)

Used to check the dependencies, remove the unused ones and install the missing ones.

`npm install -g depcheck`

## Features

This is a comprehensive list of all the features available in TuDu.

### Add Item

Simply digit your item and press the button **Add Task** to add it to your table.

### Categories

When adding a new item you can add a category with this simple sintax:

> New Item Text #Category

The category will be shown in the header of your item.

### Item Management

You can set your items as completed by pressing on the ✔️ button or you can delete the item of your choice by pressing the 🗑️ button.

### Colors

You can choose the card color of your liking by pressing the 🎨 button on the bottom right side of the card and select which color you want, you can even enter a Hex value!

### DateTime

You can set a time for the task by clicking on the ⏰ icon and choosing date and time.

## Authentication

Authentication is provided by Google Firebase, i chose to support Google's own authentication. it can be customized to support Facebook, GitHub and many more.

## Database

I choose Cloud Firestore for the database, it's reliable, fast and cloud-base, which mmakes it perfect for a web-app. te data is stored securely on Google's servers.

## Test / Deploy [![Build Status](https://travis-ci.com/tiaringhio/TuDu.svg?token=4CsoRWc4by6MkvHzh68Q&branch=master)](https://travis-ci.com/tiaringhio/TuDu)[![Netlify Status](https://api.netlify.com/api/v1/badges/806a7370-2aff-429c-9bf6-a0737227fbe4/deploy-status)](https://app.netlify.com/sites/tiaringhiotudu/deploys)

This project is tested using Travis CI/CD and deployed to Netlify.

## License

Distributed under the GPL License.

   <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 
   title="Flaticon"> www.flaticon.com</a></div>
   
   <!-- CONTRIBUTORS -->
   ## Contributors

[Mattia Ricci](https://github.com/tiaringhio)
