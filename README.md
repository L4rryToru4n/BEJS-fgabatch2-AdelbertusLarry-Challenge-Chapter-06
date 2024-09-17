# Basic Art Gallery
## Introduction
Basic Art Gallery is a backend web application that serves media handling such as uploading images/videos by saving the files temporarily in local using Multer package then saved into the cloud by using ImageKit SDK. 
In order to ease the operation, the application is hosted in Railway and automatically deployed using GitHub Actions after a development has been resolved.

There are two main endpoints to be served in this application. These endpoints are `Users` and `Media`. The `Media` endpoint will manage the metadata of an image such as it's title, description and file's URL while the `Users` endpoint will be able to get and create users. In addition, it will also able to manage uploaded image such as uploading and deleting.

## API Functionalities
### Users
`Users` endpoint will manage the data of a user. The API functionalities can be accessed using the following uri:
- `/users`
- `/users/{id}`
- `/users/create`

### Media
`Media` endpoint will manage the data of a media possessed by a user. The API functionalities can be accessed using the following uri:
- `/media/{user_id}`
- `/media/detail/{user_id}/{image_id}`
- `/media/imagekit/{user_id}`
- `/media/update/{user_id}/{image_id}`
- `/media/delete/{user_id}/{image_id}`

## Setup
In order to do demo, clone the project by typing this command into the terminal: 
```
git clone https://github.com/L4rryToru4n/BEJS-fgabatch2-AdelbertusLarry-Challenge-Chapter-06.git
```
or download the project then extract the .zip file.

## Usage Instructions
After downloading or cloning the repository, head to the main directory using a CLI to get the project started and initialize the project's database by running the command
```
npx prisma migrate dev --name init
```
Next, install all of the Node packages by running the command
```
npm install
```
Lastly, to get the project's server running enter the command
```
npm run start
```
All endpoints then can be accessed starting from `localhost:5000/api/v1/{name_of_the_main_endpoint}`.


## Demo API App (Railway):
https://challenge-chapter-06-production.up.railway.app/
