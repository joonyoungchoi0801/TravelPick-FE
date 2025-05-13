import Layout from '../../components/layout';
import { useQuery, gql } from '@apollo/client';
import {
  SearchResortsData,
  SearchResortsResponse,
  SearchResortsVars,
} from './Home.type';
import TravelBox from '../../components/travelbox';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';

const SEARCH_RESORTS = gql`
  query SearchResorts($query: String, $dataurls: [String!], $count: Int!) {
    searchResorts(
      searchDto: { query: $query, dataurls: $dataurls, count: $count }
    ) {
      id
      name
      description
      similarity
      photos {
        id
        index
        dataurl
      }
    }
  }
`;

function Home() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<
    SearchResortsData,
    SearchResortsVars
  >(SEARCH_RESORTS, {
    variables: {
      query: '유명하고 추천하고 싶은 관광지',
      dataurls: [],
      count: 10,
    },
  });
  const handleRegister = () => {
    if (localStorage.getItem('isLogin') === 'true') {
      navigate('/register');
    } else {
      alert('로그인 후 이용해주세요.');
    }
  };

  const TravelList = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.searchResorts.length === 0) {
      return <p>검색 결과가 없습니다.</p>;
    }

    return data.searchResorts.map((resort: SearchResortsResponse) => (
      <TravelBox
        key={resort.id}
        id={resort.id}
        imgSrc={resort.photos[0]?.dataurl}
        title={resort.name}
        description={resort.description}
        similarity={resort.similarity}
      />
    ));
  };
  return (
    <Layout>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>추천 관광지</h1>
          <button className={styles.button} onClick={handleRegister}>
            여행지 등록
          </button>
        </div>

        <TravelList />
      </div>
    </Layout>
  );
}

export default Home;
