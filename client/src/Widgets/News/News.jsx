import { useEffect, useState, useRef } from "react";
import "./style.scss";
import { newsApi } from "../../Entities/News/api/service";

const PostPagination = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [newsContent, setNewsContent] = useState("");
  const tempDivRef = useRef(null);

  useEffect(() => {
    const newTempDiv = document.createElement("div");
    newTempDiv.classList.add("ql-editor-wrapper-width");
    newTempDiv.innerHTML = posts[currentPage].news_content;
    setNewsContent(posts[currentPage].news_content);
    tempDivRef.current.appendChild(newTempDiv);

    // Удаление tempDiv при размонтировании компонента
    return () => {
      tempDivRef.current?.removeChild(newTempDiv);
    };
  }, [currentPage, posts]);

  const nextPage = () => {
    if (currentPage < posts?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="post News-container-content ql-editor">
        <div style={{ flexGrow: 1 }} ref={tempDivRef}></div>
      </div>
      <div className="News-buttons">
        <button onClick={prevPage} disabled={currentPage === 0}></button>
        <button
          onClick={nextPage}
          disabled={currentPage === posts.length - 1}
        ></button>
      </div>
    </div>
  );
};

function News() {
  const { data: news } = newsApi.useGetNewsQuery();
  const [newsData, setNewsData] = useState();
  useEffect(() => {
    setNewsData(news);
  }, [news]);

  console.log(news);

  return (
    <div className="News-container" id="newsSection">
      <div className="News-title">
        <img src="assets/ellipse1.png" />
        <h1>// NEWS</h1>
      </div>
      <div>
        {newsData !== undefined ? (
          <PostPagination posts={newsData} />
        ) : (
          <div>Нет новостей</div>
        )}
      </div>
    </div>
  );
}

export default News;
