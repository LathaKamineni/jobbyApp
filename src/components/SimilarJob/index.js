import './index.css'

import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagHandleOutline} from 'react-icons/io5'

const SimilarJob = props => {
  const {job} = props
  const newJob = {
    ...job,
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
  }
  return (
    <li className="job-item-container">
      <div className="logo-title-container">
        <img
          src={newJob.companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-rating-container">
          <h1 className="title">{newJob.title}</h1>
          <div className="rating-container">
            <FaRegStar className="rating-icon" />
            <p className="title">{newJob.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="job-description">{newJob.jobDescription}</p>
      <div className="location-job-type-container">
        <IoLocationOutline className="location-icon" />
        <p className="location">{newJob.location}</p>
        <IoBagHandleOutline className="bag-icon" />
        <p className="location">{newJob.employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJob
