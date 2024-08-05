import {Link} from 'react-router-dom'

import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagHandleOutline} from 'react-icons/io5'

import './index.css'

const JobItem = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  return (
    <Link to={`/jobs/${id}`}>
      <li className="job-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaRegStar className="rating-icon" />
              <p className="title">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-ctc-container">
          <div className="location-job-type-container">
            <IoLocationOutline className="location-icon" />
            <p className="location">{location}</p>
            <IoBagHandleOutline className="bag-icon" />
            <p className="location">{employmentType}</p>
          </div>
          <p className="location">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
