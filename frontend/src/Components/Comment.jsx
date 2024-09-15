import React from 'react'
import "../Pages/Feed.css"
import PropTypes from 'prop-types';


function Comment({ name, comment }) {
    
  return (
    <div className="commentsection">
                <div className="username">
                  <div className="round2"></div>
                  <div className="classify">
                    <h1>{name}</h1>
                    <p>{comment} </p>
                  </div>
                </div>
              </div>
  )
}
Comment.propTypes = {
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  };


export default Comment