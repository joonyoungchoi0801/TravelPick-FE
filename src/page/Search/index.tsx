import Layout from "../../components/layout";
import styles from "./Search.module.scss";
import TravelBox from "../../components/travelbox";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get("term");
  return (
    <Layout>
      <div className={styles.content}>
        <span className={styles.term}>
          {searchTerm}과(와) 일치하는 검색결과
        </span>
        <TravelBox />
      </div>
    </Layout>
  );
}

export default SearchPage;
