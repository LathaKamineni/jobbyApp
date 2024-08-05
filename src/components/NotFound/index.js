import './index.css'

const NotFound = () => {
  return (
    <div className="not-found-contianer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  )
}

export default NotFound
