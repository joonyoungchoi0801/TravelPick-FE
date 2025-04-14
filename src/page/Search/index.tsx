import Layout from "../../components/layout";
import styles from "./Search.module.scss";
import TravelBox from "../../components/travelbox";

function SearchPage() {
  return (
    <Layout>
      <div className={styles.content}>
        <span className={styles.term}>서울과(와) 일치하는 검색결과</span>
        <TravelBox />
      </div>
    </Layout>
  );
}

export default SearchPage;
