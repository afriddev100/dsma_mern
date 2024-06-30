import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeScreen() {
  return (
    <>
      <div className="background-container">
        <div className="overlay"></div>
        <div className="content">
          <h1>Welcome to Driving School App</h1>
          <p>


            <Link class="nav-link active" aria-current="page" to="/enroll">
              <button type="button" className="btn btn-light enrollbutton" >Enroll Now
              </button>
            </Link>

          </p>
        </div>
      </div>
    </>
  )
}
