## Description

This mini-app is a 'retro' youtube clone built with React. The app makes use of the Youtube v3 data API to fetch search results prior to 2009. Additionally, a CORS server is used to retrieve youtube thumbnails prior to loading a video. The purpose of the app was to build a small-scale react application that makes use of a public API.

## Technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Installation

Please see https://github.com/elesian/retrotube-react-app.git for a live demo.

### Prerequisites

- Ensure you have 14.x (Node v14 Fermium LTS).

### NPM Instructions

1. Clone the repository locally using `git clone https://github.com/elesian/retrotube-react-app.git`.
2. Run `npm install` to install dependencies.

## Features

**Important - The API keys listed within the source code have a maximal limit of 100 searches per 24 hours. A 403 error will occur if the API limit is exceeded.**
 
- Input validation feedback.
- Loading status during data retrieval. 
- Thumbnail retrieval via external CORS server.
- Basic pagination - forwards/backwards retrieval of searh results.
- Video player that responsively scales to device viewport. 
- Responsive design. 

## Project status

The core functionality of the project has been implemented. Future features would include:

- Build a landing page showing popular videos for different video categories.
- Add total video views and channel.
- OAUTH2.0 authentication for POST/PATCH/DELETE requests i.e. video uploading or comment deletion.

## Licensing

The software is released under the terms of the ISC license. Further information is available <a href="https://opensource.org/licenses/ISC">here.</a>
