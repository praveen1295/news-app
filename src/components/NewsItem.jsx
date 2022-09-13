import React from "react";

const NewsItem = (props) => {
  let { title, description, imageURL, newsURL, author, date, source } = props;
  return (
    <div className="card my-3">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0",
        }}
      >
        <span className="badge rounded-pill bg-danger">{source}</span>
      </div>
      <img
        src={
          !imageURL
            ? "https://minerescue.org/wp-content/uploads/2020/03/Marketplace-Lending-News.jpg"
            : imageURL
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}... </h5>
        <p className="card-text">{description}...</p>
        <p className="card-text">
          <small className="text-muted">
            By {author ? author : "unknown"} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a href={newsURL} target="blank" className="btn btn-sm btn-primary">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
