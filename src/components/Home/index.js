import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamlist: [],
    isloading: true,
  }
  componentDidMount() {
    this.getTeams()
  }
  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log()

    const updatedteam = data.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({teamlist: updatedteam, isloading: false})
  }
  renderTeamlist = () => {
    const {teamlist} = this.state
    return (
      <ul>
        {teamlist.map(team => (
          <TeamCard key={team.id} teamDetails={team} />
        ))}
      </ul>
    )
  }
  render() {
    const {isloading} = this.state
    return (
      <div className="ipl-background-container home-bg-container">
        <div className="wrap-container ipl-dashboard-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="iplLogo"
          />
          <h1 className="Heading">IPL Dashboard</h1>
        </div>
        {isloading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamlist()
        )}
      </div>
    )
  }
}

export default Home
