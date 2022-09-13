import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { PropTypes } from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);

  const capitalizeFirstLatter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    if (!(page + 1 > Math.ceil(totalArticles / props.pageSize))) {
    }
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLatter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    // setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(parsedData.totalResults);
  };
  // handlePreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };

  // handleNextClick = async () => {
  //   console.log("next");
  //   setPage(page + 1);
  //   updateNews();
  // };
  return (
    <React.Fragment>
      <h1 className="text-center" style={{ margin: "90px 0px 35px 0px" }}>
        newsMonkey - Top {capitalizeFirstLatter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      {/* {!loading && */}
      {/* for infinite scroll bar */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 87)
                        : ""
                    }
                    imageURL={element.urlToImage}
                    newsURL={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
            <button
              disabled={page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={handlePreviousClick}
            >
              &larr; Previous
            </button>

            <button
              disabled={
                page + 1 >
                Math.ceil(totalArticles / props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={handleNextClick}
            >
              Next &rarr;
            </button>
          </div> */}
    </React.Fragment>
  );
};

News.defaultProps = {
  name: "in",
  pageSize: 9,
  category: "general",
};
News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
