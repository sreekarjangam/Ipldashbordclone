import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedLatest = {
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const updatedRecent = data.recent_matches.map(match => ({
      umpires: match.umpires,
      result: match.result,
      manOfTheMatch: match.man_of_the_match,
      id: match.id,
      date: match.date,
      venue: match.venue,
      competingTeam: match.competing_team,
      competingTeamLogo: match.competing_team_logo,
      firstInnings: match.first_innings,
      secondInnings: match.second_innings,
      matchStatus: match.match_status,
    }))

    this.setState({
      teamBannerUrl: data.team_banner_url,
      latestMatch: formattedLatest,
      recentMatches: updatedRecent,
      isLoading: false,
    })
  }

  render() {
    const {teamBannerUrl, latestMatch, recentMatches, isLoading} = this.state

    return (
      <div className="team-matches-bg-container">
        {isLoading ? (
          <div className="loader-container" testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />

            <h2 className="latest-matches-heading">Latest Matches</h2>

            <LatestMatch latestMatch={latestMatch} />

            <ul className="recent-matches-list">
              {recentMatches.map(match => (
                <MatchCard key={match.id} matchDetails={match} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
