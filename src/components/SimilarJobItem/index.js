import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {GiSuitcase} from 'react-icons/gi'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetail} = props
  const {
    similarCompanyLogo,
    similarJobType,
    id,
    similarJobDescription,
    similarLocation,
    rating,
    title,
  } = similarJobDetail

  return (
    <div className="similar-job-item">
      <div className="job-sim-item-card">
        <div className="heading-items">
          <img
            src={similarCompanyLogo}
            className="job-item-sim-image-style"
            alt="similar job company logo"
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
              <p>{similarLocation}</p>
            </div>
            <div className="employment-type-container">
              <GiSuitcase className="suitcase-style" />
              <p>{similarJobType}</p>
            </div>
          </div>
        </div>
        <div className="desc-container">
          <h1 className="des-heading">Description</h1>
          <p>{similarJobDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobItem
