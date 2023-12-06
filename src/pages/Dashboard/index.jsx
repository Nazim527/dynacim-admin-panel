import React from "react";
import "./style.scss";

import statusCards from "../../helpers/JsonData/status-card-data.json";
import StatusCard from "../../components/status Card";
import { getFetchCategories } from "../../api/getCategories";
import { getFetchAuthors } from "../../api/getAuthor";
import { getFetchNews } from "../../api/getnews";

const Dashboard = () => {
  const [AllCategoriesFetch, setAllCategoriesFetch] = React.useState([]);
  const [AllAuthorsFetch, setAllAuthorsFetch] = React.useState([]);
  const [AllNewsFetch, setAllNewsFetchFetch] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAll();
  }, [AllAuthorsFetch, AllCategoriesFetch]);

  const fetchAll = async () => {
    try {
      const dataCategories = await getFetchCategories();
      const dataAuthors = await getFetchAuthors();
      const dataNews = await getFetchNews();

      setAllNewsFetchFetch(dataNews);
      setAllCategoriesFetch(dataCategories);
      setAllAuthorsFetch(dataAuthors);
      setLoading(true);
    } catch (error) {
      console.error("API de xeta bas verdi!", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(AllAuthorsFetch);

  return (
    <div className="Dashboard">
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="row-1">
          {AllCategoriesFetch.categories &&
            AllAuthorsFetch.authors &&
            statusCards.map((item, index) => (
              <div className="col-6">
                {/* Status Card */}
                <StatusCard
                  icon={item.icon}
                  count={
                    item.title === "Total Categories"
                      ? AllCategoriesFetch.categories.length
                      : item.title === "Total Author"
                      ? AllAuthorsFetch.authors.length
                      : item.title === "Total News"
                      ? AllNewsFetch.allNews.length
                      : 0
                  }
                  title={item.title}
                />
              </div>
            ))}
        </div>
        <div className="row-2">
          <div class="welcome-page">
            <div class="corner"></div>
            <div class="corner"></div>
            <div class="corner"></div>
            <div class="corner"></div>
            <div class="content">
              <p data-shadow="WELCOME">
                <span>W</span>
                <span>E</span>
                <span>L</span>
                <span>C</span>
                <span>O</span>
                <span>M</span>
                <span>E</span>
              </p>
            </div>
            <div class="right-vert-line"></div>
            <div class="left-vert-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
