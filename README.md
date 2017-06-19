# Pixi-VN
Visual Novel Engine written using [pixi.js](http://www.pixijs.com/), [ES6](http://es6-features.org) and [nodejs](https://nodejs.org/).

## Installation Instructions
 - Install [nodejs](https://nodejs.org/)
 - Clone this repository
 - Inside the local repository, install dependencies  
    `npm install`
 - If all install correctly, start the server  
    `npm run start`

## Setup files
  ### config.json
  Specifies all the assets and information you'll use in your visual novel, like character details, views, and script files. The library looks through config.json to find pictures and data it needs to preload.
  ###  Scripts
  The scripting system is loosely based off of the conversation system from [Fungus](https://github.com/snozbot/fungus).
  Set the startScript in config.json to tell the system what script to start from. From there, it will go in order of the listed scripts.

## Contributing
 - Bugs - if you see a bug and want to report it, add it to the github issues list, preferably with screenshots and a thurough description of the problem, then tag it as a bug.
 - Feature Requests - Want a feature or want to start working on a feature? Write an issue and tag it as a feature request. People can vote on that feature and give me more of a reason to work on it.
 - Now that you've written an issue, feel free to take up the mantle by forking the repo, adding your changes and submitting a pull request, you awesome person you!
