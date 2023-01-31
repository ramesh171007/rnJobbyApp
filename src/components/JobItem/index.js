import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {GiSuitcase} from 'react-icons/gi'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoURL,
    employmentType,
    description,
    location,
    rating,
    title,
    packagePer,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-style">
      <div className="job-item-container">
        <div className="job-item-card">
          <div className="heading-detail-items">
            <img
              src={companyLogoURL}
              alt=" job details company logo"
              className="job-item-image-style"
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
            <h1 className="des-heading">Description</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobItem
