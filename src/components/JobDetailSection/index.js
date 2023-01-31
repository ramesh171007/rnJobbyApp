import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {GiSuitcase} from 'react-icons/gi'
import Header from '../Header/index'
import Skills from '../Skills/index'
import SimilarJobItem from '../SimilarJobItem/index'

import './index.css'

class JobDetailSection extends Component {
  state = {
    jobDetailObj: {},
    skillsRequired: [],
    lifeAt: {},
    similarJobList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobDetail()
  }

  getJobDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobApiUrl, options)
    const data = await response.json()
    const jobDetail = data.job_details
    const similarJob = data.similar_jobs
    const newSimilarJob = similarJob.map(each => ({
      similarCompanyLogo: each.company_logo_url,
      similarJobType: each.employment_type,
      id: each.id,
      similarJobDescription: each.job_description,
      similarLocation: each.location,
      rating: each.rating,
      title: each.title,
    }))

    const life = jobDetail.life_at_company
    const newlife = {
      lifeDescription: life.description,
      imageURL: life.image_url,
    }
    this.setState({lifeAt: newlife})

    const skill = jobDetail.skills
    const newSkills = skill.map(each => ({
      name: each.name,
      skillImageURl: each.image_url,
    }))

    const newJobDetail = {
      id: jobDetail.id,
      companyLogoURl: jobDetail.company_logo_url,
      companySite: jobDetail.company_website_url,
      employmentType: jobDetail.employment_type,
      description: jobDetail.job_description,
      lifeAtCompany: newlife,
      location: jobDetail.location,
      packagePer: jobDetail.package_per_annum,
      rating: jobDetail.rating,
      skills: newSkills,
      title: jobDetail.title,
    }
    this.setState({
      jobDetailObj: newJobDetail,
      skillsRequired: newSkills,
      similarJobList: newSimilarJob,
      isLoading: false,
    })
  }

  renderJobDetailPage = () => {
    const {
      jobDetailObj,
      skillsRequired,
      lifeAt,
      similarJobList,
      isLoading,
    } = this.state
    const {
      companyLogoURl,
      companySite,
      employmentType,
      description,
      lifeAtCompany,
      location,
      packagePer,
      rating,
      skills,
      title,
    } = jobDetailObj

    const {lifeDescription, imageURL} = lifeAt
    return (
      <div className="job-detail-card">
        <div className="job-item-card">
          <div className="heading-items">
            <img
              src={companyLogoURl}
              className="job-item-image-style"
              alt="job details company logo"
            />
            <div className="heading-text">
              <h1 className="job-item-heading">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-style" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-container">
            <div className="location-card">
              <div className="location-item">
                <FaMapMarkerAlt className="location-style" />
                <p>{location}</p>
              </div>
              <div className="employment-type-container">
                <GiSuitcase className="suitcase-style" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="package-style">{packagePer}</p>
          </div>
          <hr />
          <div className="desc-container">
            <div className="desc-heading-container">
              <div className="heading-container">
                <h1 className="des-heading">Description</h1>
              </div>
              <div className="visit-container">
                <a href={companySite} className="visit-style">
                  Visit <BiLinkExternal className="BiLink-style" />
                </a>
              </div>
            </div>
            <p>{description}</p>
          </div>
          <h1 className="des-heading">Skills</h1>
          <ul className="skills-container">
            {skillsRequired.map(each => (
              <Skills key={each.name} skillDetails={each} />
            ))}
          </ul>
          <div className="life-at-company-container">
            <div className="desc-container">
              <h1 className="des-heading">Life At Company</h1>
              <p>{lifeDescription}</p>
            </div>
            <img src={imageURL} alt="Life at Company" />
          </div>
        </div>
        <h1 className="simi-job">Similar Jobs</h1>
        <ul className="simi-job-container">
          {similarJobList.map(each => (
            <SimilarJobItem key={each.id} similarJobDetail={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {
      jobDetailObj,
      skillsRequired,
      lifeAt,
      similarJobList,
      isLoading,
    } = this.state
    const {
      companyLogoURl,
      companySite,
      employmentType,
      description,
      lifeAtCompany,
      location,
      packagePer,
      rating,
      skills,
      title,
    } = jobDetailObj

    const {lifeDescription, imageURL} = lifeAt

    return (
      <div className="detail-container">
        <Header />
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          this.renderJobDetailPage()
        )}
      </div>
    )
  }
}

export default JobDetailSection
