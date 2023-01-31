import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Profile from '../Profile/index'
import JobItem from '../JobItem/index'
import FilterEmployment from '../FilterEmployment/index'
import FilterSalaryRange from '../FilterSalaryRange/index'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profile: {},
    salaryFilter: '',
    fullTime: true,
    partTime: true,
    freeLance: true,
    internship: true,
    checkBoxList: [],
    searchVal: '',
    jobList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobApi()
  }

  onChangeSearchVal = event => {
    this.setState({searchVal: event.target.value})
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiURL = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiURL, options)
    const data = await response.json()
    const profileDetail = data.profile_details

    const newProfile = {
      name: profileDetail.name,
      profileImageURl: profileDetail.profile_image_url,
      bio: profileDetail.short_bio,
    }
    this.setState({profile: newProfile})
  }

  getJobApi = async () => {
    const {salaryFilter, searchVal, checkBoxList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxList.join()}&minimum_package=${salaryFilter}&search=${searchVal}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobData = data.jobs
      const newData = jobData.map(eachJob => ({
        companyLogoURL: eachJob.company_logo_url,
        id: eachJob.id,
        employmentType: eachJob.employment_type,
        description: eachJob.job_description,
        location: eachJob.location,
        packagePer: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobList: newData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFulltime = id => {
    const {fullTime} = this.state

    console.log(fullTime)
    if (fullTime) {
      this.setState(
        prevState => ({
          checkBoxList: [...prevState.checkBoxList, id],
          fullTime: !prevState.fullTime,
        }),
        this.getJobApi,
      )
    } else if (fullTime === false) {
      this.setState(
        prevState => ({
          checkBoxList: prevState.checkBoxList.filter(
            each => each !== 'FULLTIME',
          ),
          fullTime: !prevState.fullTime,
        }),
        this.getJobApi,
      )
    }
  }

  renderPartTime = id => {
    const {partTime} = this.state

    console.log(partTime)
    if (partTime) {
      this.setState(
        prevState => ({
          checkBoxList: [...prevState.checkBoxList, id],
          partTime: !prevState.partTime,
        }),
        this.getJobApi,
      )
    } else if (partTime === false) {
      this.setState(
        prevState => ({
          checkBoxList: prevState.checkBoxList.filter(
            each => each !== 'PARTTIME',
          ),
          partTime: !prevState.partTime,
        }),
        this.getJobApi,
      )
    }
  }

  renderFreelance = id => {
    const {freeLance} = this.state

    if (freeLance) {
      this.setState(
        prevState => ({
          checkBoxList: [...prevState.checkBoxList, id],
          freeLance: !prevState.freeLance,
        }),
        this.getJobApi,
      )
    } else if (freeLance === false) {
      this.setState(
        prevState => ({
          checkBoxList: prevState.checkBoxList.filter(
            each => each !== 'FREELANCE',
          ),
          freeLance: !prevState.freeLance,
        }),
        this.getJobApi,
      )
    }
  }

  renderInternship = id => {
    const {internship} = this.state

    if (internship) {
      this.setState(
        prevState => ({
          checkBoxList: [...prevState.checkBoxList, id],
          internship: !prevState.internship,
        }),
        this.getJobApi,
      )
    } else if (internship === false) {
      this.setState(
        prevState => ({
          checkBoxList: prevState.checkBoxList.filter(
            each => each !== 'INTERNSHIP',
          ),
          internship: !prevState.internship,
        }),
        this.getJobApi,
      )
    }
  }

  getClickedEmployment = id => {
    const {fullTime, partTime} = this.state
    switch (id) {
      case 'FULLTIME':
        return this.renderFulltime(id)

      case 'PARTTIME':
        return this.renderPartTime(id)

      case 'FREELANCE':
        return this.renderFreelance(id)

      case 'INTERNSHIP':
        return this.renderInternship(id)

      default:
        return null
    }
  }

  getSalaryStats = id => {
    this.setState({salaryFilter: id}, this.getJobApi)
  }

  renderEmployMent = () => (
    <div className="employment-container">
      <h1 className="typesEmploy">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachItem => (
          <FilterEmployment
            key={eachItem.employmentTypeId}
            employmentDetails={eachItem}
            getClickedEmployment={this.getClickedEmployment}
          />
        ))}
      </ul>
    </div>
  )

  renderSalaryList = () => (
    <div className="salary-container">
      <h1 className="typesEmploy">Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachItem => (
          <FilterSalaryRange
            key={eachItem.salaryRangeId}
            salaryDetail={eachItem}
            getSalaryStats={this.getSalaryStats}
          />
        ))}
      </ul>
    </div>
  )

  getSearchInput = () => {
    this.setState({searchVal: ''})
    this.getJobApi()
  }

  renderJobDetails = () => {
    const {profile, jobList, checkBoxList, searchVal} = this.state
    const jobListLen = jobList.length > 0

    return jobListLen ? (
      <>
        <div className="jog-bg-container-sm">
          <div className="search-container">
            <input
              type="search"
              className="input-style"
              placeholder="Search"
              onChange={this.onChangeSearchVal}
              value={searchVal}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.getSearchInput}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <Profile profileDetail={profile} />
          <hr />
          {this.renderEmployMent()}
          <hr />
          {this.renderSalaryList()}
          <div className="display-job-container">
            {jobList.map(eachJob => (
              <JobItem key={eachJob.id} jobDetails={eachJob} />
            ))}
          </div>
        </div>
        <div className="job-lg-container">
          <div className="filter-group-lg">
            <Profile profileDetail={profile} />
            <hr />
            {this.renderEmployMent()}
            <hr />
            {this.renderSalaryList()}
          </div>
          <div className="display-job-container">
            <div className="search-container">
              <input
                type="search"
                className="input-style"
                placeholder="Search"
                onChange={this.onChangeSearchVal}
                value={searchVal}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.getJobApi}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="display-job">
              {jobList.map(eachJob => (
                <JobItem key={eachJob.id} jobDetails={eachJob} />
              ))}
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="jog-bg-container-sm">
          <div className="search-container">
            <input
              type="search"
              className="input-style"
              placeholder="Search"
              onChange={this.onChangeSearchVal}
              value={searchVal}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.getSearchInput}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <Profile profileDetail={profile} />
          <hr />
          {this.renderEmployMent()}
          <hr />
          {this.renderSalaryList()}
          <div className="not-found-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              className="not-found-sm"
              alt="no jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-desc">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        </div>
        <div className="job-lg-container">
          <div className="filter-group-lg">
            <Profile profileDetail={profile} />
            <hr />
            {this.renderEmployMent()}
            <hr />
            {this.renderSalaryList()}
          </div>
          <div className="display-job-container">
            <div className="search-container">
              <input
                type="search"
                className="input-style"
                placeholder="Search"
                onChange={this.onChangeSearchVal}
                value={searchVal}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.getJobApi}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="not-found-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1 className="no-jobs-heading">No Jobs Found</h1>
              <p className="no-jobs-desc">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        // testid="button"
        className="jobs-failure-button"
        onClick={this.getJobApi}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {profile, jobList, checkBoxList, searchVal} = this.state

    console.log(jobList)

    return (
      <div className="jobs-container">
        <Header />
        {this.renderJobProfileDetailsList()}
      </div>
    )
  }
}

export default Jobs
