const TeemoJS = require('teemojs')
const api = TeemoJS(process.env.LOL_API_KEY)

module.exports = function(app) {
  app.get('/lol/match/v4/matchlists/by-account/:encryptedAccountId', (req, res) => {
    api.get('na1', 'match.getMatchlist', req.params.encryptedAccountId).then(data => res.send({ data }))
  })

  app.get('/lol/league-exp/v4/entries/:queue/:tier/:division', (req, res) => {
    const { queue, tier, division } = req.params

      api.get('na1', 'leagueExp.getLeagueEntries', queue, tier, division).then(data => res.send({ data }))
  })

  app.get('/lol/summoner/v4/summoners/by-name/:summonerName', (req, res) => {
    api.get('na1', 'summoner.getBySummonerName', req.params.summonerName).then(data => res.send({ data }))
  })
}
