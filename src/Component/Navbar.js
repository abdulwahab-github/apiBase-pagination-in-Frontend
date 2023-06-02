import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Api cards</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ">
        <Link className='text-muted text-decoration-none ms-5 fs-5' to="showstudent" ><b>Students</b></Link>
        <Link className='text-muted text-decoration-none ms-5 fs-5'to="showteacher" ><b>Teacher</b> </Link>
        <Link className='text-muted text-decoration-none ms-5 fs-5'to="showinstitute" ><b>Institute</b> </Link>
        <Link className='text-muted text-decoration-none ms-5 fs-5'to="showcourse" ><b>Course</b> </Link>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar