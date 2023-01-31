import {Link} from 'react-router-dom'
import Header from '../Header/index'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="bg-container">
      <div className="home-info-card">
        <h1 className="home-heading-style">Find The Job That Fits Your Life</h1>
        <p className="home-sub-text-style">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="find-job-btn-style" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
