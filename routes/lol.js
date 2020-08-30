const TeemoJS = require('teemojs')
const api = TeemoJS(process.env.LOL_API_KEY)
const url = require('url')

const getRegion = (region = 'na1') => region
const getQueryParams = req => url.parse(req.url, true).query

module.exports = function(app) {
  app.get('/lol/match/v4/matchlists/by-account/:encryptedAccountId', (req, res) => {
    api.get(getRegion(req.params.region), 'match.getMatchlist', req.params.encryptedAccountId, getQueryParams(req))
      .then(data => res.send({ data }))
  })

  app.get('/lol/match/v4/matches/:matchId', (req, res) => {
    api.get(getRegion(req.params.region), 'match.getMatch', req.params.matchId).then(data => res.send({ data }))
  })

  app.get('/lol/champion-mastery/v4/champion-masteries/by-summoner/:encryptedSummonerId', (req, res) => {
    api.get(getRegion(req.params.region), 'championMastery.getAllChampionMasteries', req.params.encryptedSummonerId, getQueryParams(req))
      .then(data => res.send({ data }))
  })

  app.get('/lol/league-exp/v4/entries/:queue/:tier/:division', (req, res) => {
    const { queue, tier, division } = req.params

      api.get(getRegion(req.params.region), 'leagueExp.getLeagueEntries', queue, tier, division, getQueryParams(req))
        .then(data => res.send({ data }))
  })

  app.get('/lol/summoner/v4/summoners/by-name/:summonerName', (req, res) => {
    api.get(getRegion(req.params.region), 'summoner.getBySummonerName', req.params.summonerName, getQueryParams(req))
      .then(data => res.send({ data }))
  })
}
