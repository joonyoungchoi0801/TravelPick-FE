import Layout from '../../components/layout';
import styles from './Search.module.scss';
import TravelBox from '../../components/travelbox';
import { useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {
  SearchResortsData,
  SearchResortsResponse,
  SearchResortsVars,
} from './Search.type';
import { useEffect, useState } from 'react';

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
interface LocationState {
  file?: File;
  previewUrl?: string;
}
function SearchPage() {
  const location = useLocation();
  const { file } = (location.state || {}) as LocationState;
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get('term');
  const [dataUrls, setDataUrls] = useState<string[]>([]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setDataUrls([reader.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  const { loading, error, data } = useQuery<
    SearchResortsData,
    SearchResortsVars
  >(SEARCH_RESORTS, {
    variables: {
      query: searchTerm || '',
      dataurls: dataUrls || [],
      count: 10,
    },
  });
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
      />
    ));
  };

  return (
    <Layout>
      <div className={styles.content}>
        <span className={styles.term}>
          {searchTerm}과(와) 일치하는 검색결과
        </span>

        <TravelList />
      </div>
    </Layout>
  );
}

export default SearchPage;
