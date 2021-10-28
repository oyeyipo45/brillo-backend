import React from "react";
import { Link } from "react-router-dom";

const Body = ({ post }) => {
  return (
    <>
      <main className="body-main">
        <section className="work section bd-grid" id="work">
          <div className="grid-item">
            <div className="job-details-container">
              <div className="job-time">
                <p className="posted">1d ago</p>
                <p className="dot">·</p>
                <p className="time">{post.jobType}</p>
              </div>
              <div title="view-details" className="view-details">
                <svg
                  className="w-5 h-5 fill-current primary-color"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link to={`/post/${post._id}`} className="view">
                  View Details
                </Link>
              </div>
            </div>

            <div className="job-title">
              <h2>{post.jobTitle}</h2>
            </div>
            <div className="company-name">
              <p>{post.hirerName}</p>
            </div>
            <div className="job-location">
              {post.completed ? (
                <p className="color-red">Job Closed</p>
              ) : (
                <p className="color-green"> Job Open </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Body;
