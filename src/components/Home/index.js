import './index.css'
import Header from '../Header'
import Cookies from 'js-cookie'
import {Redirect, withRouter, Link} from 'react-router-dom'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          review. Find the job that fits your abilites and potential
        </p>
        <Link to="/jobs">
          <button className="find-jobs-button">Find Jobs</button>
        </Link>
      </div>
    </>
  )
}

export default withRouter(Home)
