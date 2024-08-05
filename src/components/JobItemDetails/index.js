import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJob from '../SimilarJob'

import Cookies from 'js-cookie'

import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {IoBagHandleOutline} from 'react-icons/io5'
import {FiExternalLink} from 'react-icons/fi'

const jobApiStatusConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class JobItemDetails extends Component {
  state = {jobData: {}, apply: false, jobApiUrlStatus: ''}

  componentDidMount() {
    this.getJobDetails()
  }

  //Get job details API
  getJobDetails = async () => {
    this.setState({jobApiUrlStatus: jobApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobApiUrl, options)
    if (response.ok) {
      const fetchedJobData = await response.json()
      console.log(fetchedJobData)
      const formatteJobData = {
        companyLogoUrl: fetchedJobData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedJobData.job_details.company_website_url,
        employmentType: fetchedJobData.job_details.employment_type,
        rating: fetchedJobData.job_details.rating,
        jobDescription: fetchedJobData.job_details.job_description,
        skills: fetchedJobData.job_details.skills,
        title: fetchedJobData.job_details.title,
        lifeAtCompany: fetchedJobData.job_details.life_at_company,
        location: fetchedJobData.job_details.location,
        packagePerAnnum: fetchedJobData.job_details.package_per_annum,
        similarJobs: fetchedJobData.similar_jobs,
      }
      this.setState({
        jobData: formatteJobData,
        jobApiUrlStatus: jobApiStatusConstants.success,
      })
    } else {
      this.setState({jobApiUrlStatus: jobApiStatusConstants.failure})
    }
  }

  //Retry button
  onClickRetry = () => {
    this.getJobDetails()
  }
  //onClick apply button
  onClickApply = () => {
    this.setState({apply: true})
  }
  //render skill
  renderSkill = skill => {
    const newSkill = {
      name: skill.name,
      imageUrl: skill.image_url,
    }
    return (
      <li className="skill-item">
        <img src={newSkill.imageUrl} alt={newSkill.name} />
        <p className="skill-name">{newSkill.name}</p>
      </li>
    )
  }

  //render job item details success view
  renderJobItemSuccessView = () => {
    const {jobData, apply} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      similarJobs,
      rating,
      title,
    } = jobData
    return (
      <div className="job-item-details-container">
        <div className="job-item-card-container">
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
          <div className="description-website-url">
            <h1 className="description-heading">Description</h1>
            <div className="website-url-container">
              <a
                href={companyWebsiteUrl}
                className="wesite-url"
                target="_blank"
              >
                Visit
              </a>
              <button type="button" className="visit-website-button">
                <FiExternalLink className="visit-icon" size={18} />
              </button>
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="description-heading">Skills</h1>
          <ul className="skills-list">
            {skills && skills.map(skill => this.renderSkill(skill))}
          </ul>
          <div className="life-at-company-container">
            <div className="life_at_company-content-container">
              <h1 className="life-at-company-heading">Life at Company</h1>
              {lifeAtCompany && (
                <p className="life-at-company-description">
                  {lifeAtCompany.description}
                </p>
              )}
            </div>
            {lifeAtCompany && (
              <img
                src={lifeAtCompany.image_url}
                alt="life at company"
                className="life-at-company-image"
              />
            )}
          </div>
          <button
            type="button"
            className="apply-now-button"
            onClick={this.onClickApply}
          >
            Apply Now
          </button>
          {apply && <p className="success-msg">Applied Successfully!!</p>}
        </div>
        <h1 className="similar-jobs-heading">Simliar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs &&
            similarJobs.map(job => <SimilarJob job={job} key={job.id} />)}
        </ul>
      </div>
    )
  }

  //render job failure view
  renderJobItemFailureView = () => {
    return (
      <div className="job-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          className="retry-button"
          type="button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </div>
    )
  }

  //render loading view
  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  //render jobItem Detail Views
  renderJobView = () => {
    const {jobApiUrlStatus} = this.state
    switch (jobApiUrlStatus) {
      case jobApiStatusConstants.success:
        return this.renderJobItemSuccessView()
      case jobApiStatusConstants.failure:
        return this.renderJobItemFailureView()
      case jobApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobView()}
      </>
    )
  }
}
export default JobItemDetails
