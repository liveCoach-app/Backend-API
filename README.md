# Backend-API

## Requirements && Running

1. node 12.18.3
1. `sudo service mongod start`
1. `.env` configs (please check `.env-template`)
1. `npm install`
1. `npm start`

## API documentation

| Method | Endpoint                                                                     | Details                                                                                                                                                                |
|--------|------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /sessions/:id                                                                | Get session by `:id`.                                                                                                                                                  |
| POST   | /sessions                                                                    | Create a new Session. You can pass an empty request body and the response will include the new Session `id`.                                                           |
| GET    | /annotations?session=:sessionId                                              | Get Annotations by `:sessionId` query parameter.                                                                                                                       |
| POST   | /annotations                                                                 | Create a new Annotation, sending the following request structure:<br><br>`text` - String, required.<br>`session` - String, required.<br>`drawings` - Object, optional. |
| PUT    | /annotations/:id                                                             | Update a Session by `:id`, sending the above structure completely or partialy.                                                                                         |
| DELETE | /annotations/:id                                                             | Delete a Session by `:id`.                                                                                                                                             |
| GET    | /lol/match/v4/matchlists/by-account/:encryptedAccountId                      | https://developer.riotgames.com/apis#match-v4/GET_getMatchlist                                                                                                         |
| GET    | /lol/match/v4/matches/:matchId                                               | https://developer.riotgames.com/apis#match-v4/GET_getMatch                                                                                                             |
| GET    | /lol/champion-mastery/v4/champion-masteries/by-summoner/:encryptedSummonerId | https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteries                                                                                   |
| GET    | /lol/league-exp/v4/entries/:queue/:tier/:division                            | https://developer.riotgames.com/apis#league-exp-v4/GET_getLeagueEntries                                                                                                |
| GET    | /lol/summoner/v4/summoners/by-name/:summonerName                             | https://developer.riotgames.com/apis#league-exp-v4/GET_getLeagueEntries                                                                                                |

## Architecture

![Live coaching architecture diagram and flow](https://github.com/liveCoach-app/Backend-API/blob/master/live-coaching-architecture.png)

1. **LoL Client API** - is the official Riots REST API for accessing the player live data.
1. **Player Stats Broadcaster** - because the LoL API can be accessed only locally, we're going to develop a tiny node.js that will consume the LoL API and will broadcast the Player data to the Coach via Websockets (WS).
1. **Backend** - here we are going to serve two applications - **WS Server** and **REST API**.
    1. **WS Server** - will serve a Websocket server. Will receive the Player live data and will broadcast it to the Coach, identifying the Coach by an unique Session id.
    1. **REST API** - will expose our Business logic and DB models via REST interface. Also, we will expose API routes, these will give you access to the Riots API routes - such as /matchhistory.
1. **Frontend** - our web app.
    1. **WS Client** - will listen for the Player's live data via WS and will render it.
    1. **CRUD** - this part of the Frontend module will be responsible for all **C**reate / **R**ead / **U**pdate / **D**elete operations and will communicate with our Backend REST API. For example - creating Annotations, creating Drawings, reading Riots /matchhistory data and etc.
