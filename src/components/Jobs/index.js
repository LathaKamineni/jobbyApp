import './index.css'

import Header from '../Header'
import JobItem from '../JobItem'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

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

const profileApiStatusConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
const jobsApiStatusConstants = {
  initial: 'INITAIL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Jobs extends Component {
  state = {
    profileApiStatus: profileApiStatusConstants.initial,
    profileData: {},
    jobsApiStatus: jobsApiStatusConstants.initial,
    jobsData: [],
    search: '',
    activeMinimumPackage: '',
    activeEmploymentList: [],
    userInput: '',
  }
  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  //render employement Options
  renderEmploymentOptions = options => {
    return (
      <li key={options.employmentTypeId}>
        <input
          type="checkbox"
          id={options.employmentTypeId}
          value={options.employmentTypeId}
          onChange={this.onChangeEmploymentType}
        />
        <label htmlFor={options.employmentTypeId} className="employment-type">
          {options.label}
        </label>
      </li>
    )
  }

  //change employment options
  onChangeEmploymentType = event => {
    if (event.target.checked) {
      console.log(event.target.value)
      this.setState(
        prevState => ({
          activeEmploymentList: [
            ...prevState.activeEmploymentList,
            event.target.value,
          ],
        }),
        this.getJobsDetails,
      )
    } else {
      this.setState(
        prevState => ({
          activeEmploymentList: prevState.activeEmploymentList.filter(
            item => item !== event.target.value,
          ),
        }),
        this.getJobsDetails,
      )
    }
  }
  //render salary options
  renderSalaryOptions = options => {
    return (
      <li key={options.salaryRangeId}>
        <input
          type="radio"
          id={options.salaryRangeId}
          value={options.salaryRangeId}
          onChange={this.onChangeSalaryOption}
          name="salary"
        />
        <label htmlFor={options.salaryRangeId} className="employment-type">
          {options.label}
        </label>
      </li>
    )
  }
  //changing salary range
  onChangeSalaryOption = event => {
    this.setState(
      {activeMinimumPackage: event.target.value},
      this.getJobsDetails,
    )
  }
  //API request to get job details
  getJobsDetails = async () => {
    this.setState({jobsApiStatus: jobsApiStatusConstants.inProgress})
    const {userInput, activeEmploymentList, activeMinimumPackage} = this.state
    console.log(activeEmploymentList)
    const employementOptions = activeEmploymentList.join(',')
    console.log(employementOptions)
    const jobsApiUrl = `https://apis.ccbp.in/jobs?search=${userInput}&minimum_package=${activeMinimumPackage}&employment_type=${employementOptions}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const responseJobsData = await response.json()
    const formattedJobsData = responseJobsData.jobs.map(job => ({
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      jobDescription: job.job_description,
      id: job.id,
      packagePerAnnum: job.package_per_annum,
      location: job.location,
      title: job.title,
      rating: job.rating,
    }))
    if (response.ok) {
      this.setState({
        jobsApiStatus: jobsApiStatusConstants.success,
        jobsData: formattedJobsData,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConstants.failure})
    }
  }

  //API request to get profile Details
  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileApiStatusConstants.inProgress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileUrl, options)

    const data = await response.json()

    if (response.ok) {
      const profileData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData,
        profileApiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getProfileDetails()
  }

  //render profile view
  renderProfileView = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileApiStatusConstants.success:
        return this.renderProfileSuccessView()
      case profileApiStatusConstants.failure:
        return this.renderProfileFailureView()
      case profileApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
  //rendering profile success view
  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImgUrl, shortBio} = profileData

    return (
      <div className="profile-bg-container">
        <img src={profileImgUrl} />
        <h1 className="name">{name}</h1>
        <p className="shor-bio">{shortBio}</p>
      </div>
    )
  }
  //rendering profile failure view
  renderProfileFailureView = () => {
    return (
      <div className="profile-failure-container">
        <button className="retry-button" onClick={this.onClickRetry}>Retry</button>
      </div>
    )
  }

  //rendering Loading view
  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  //render jobs view
  renderJobsView = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusConstants.success:
        return this.renderJobsSuccessView()
      case jobsApiStatusConstants.failure:
        return this.renderJobsFailureView()
      case jobsApiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  //render jobs success view
  renderJobsSuccessView = () => {
    const {jobsData, userInput} = this.state
    const searchResults = jobsData.filter(job =>
      job.title.toLowerCase().includes(userInput.toLowerCase()),
    )
    const totalJobs = searchResults.length
    if (totalJobs === 0) {
      return this.renderNoJobsView()
    } else {
      return this.renderJobs()
    }
  }

  //render jobs
  renderJobs = () => {
    const {jobsData, userInput} = this.state
    const searchResults = jobsData.filter(job =>
      job.title.toLowerCase().includes(userInput.toLowerCase()),
    )

    return (
      <>
        <ul className="jobs-container">
          {searchResults.map(job => (
            <JobItem job={job} key={job.id} />
          ))}
        </ul>
      </>
    )
  }

  //render no jobs view
  renderNoJobsView = () => {
    return (
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="failure-image"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  //render jobs failure view
  renderJobsFailureView = () => {
    return (
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.onReloadJobDetails}
        >Retry</button>
      </div>
    )
  }
  // on reload job details
  onReloadJobDetails = () => {
    this.getJobsDetails()
  }

  //change search input
  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }
  //search Result
  searchResults = () => {
    const {search} = this.state
    this.setState({userInput: search})
  }
  render() {
    const {search} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="input-search-container">
            <input
              type="search"
              className="search-input"
              placeholder="search"
              onChange={this.onChangeSearch}
              value={search}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.searchResults}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-options-container">
            <div className="profile-container">{this.renderProfileView()}</div>
            <hr className="line" />
            <p className="options-heading">Type of Employment</p>
            <ul className="options-list">
              {employmentTypesList.map(options =>
                this.renderEmploymentOptions(options),
              )}
            </ul>
            <hr className="line" />
            <p className="options-heading">Salary Range</p>
            <ul className="options-list">
              {salaryRangesList.map(options =>
                this.renderSalaryOptions(options),
              )}
            </ul>
          </div>
          <div className="jobs-view">
            <div className="input-desktop-search-container">
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.onChangeSearch}
                value={search}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.searchResults}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
