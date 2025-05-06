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
const mockData = [
  {
    rating: 4.9,
    reviewCount: 30,
    imgSrc:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/be/64/photo6jpg.jpg?w=1200&h=-1&s=1',
    title: '다낭',
    description:
      '다낭은 태평스럽고 상냥한 데, 그 이유는 만나는 모든 사람들이 방금 맛있는 식사를 마친 후이기 때문일 수 있습니다. 요리 여행은 문자 그대로 지역의 향기를 맛볼 수 있는 아주 좋은 경험입니다. 굵은 국수 수프와 풍미 있는 거리의 음식들로 배를 채운 후에 마블 산의 석회 동굴과 불교 사원 동굴을 걸어서 방문해 보십시오.',
  },
  {
    rating: 3.5,
    reviewCount: 5,
    imgSrc:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/01/86/d4/jesuitenkirche.jpg?w=1000&h=400&s=1',
    title: '루체른',
    description:
      'Lucerne is an ancient town with strikingly modern sensibilities. One of Europe’s oldest covered bridges serves as its centerpiece, and fresco-adorned historic houses line the streets, but it’s also home to the cutting-edge KKL, a concert hall and art gallery. Take the cableways up the Pilatus, Stanserhorn or Rigi mountains for breathtaking views, or see Lake Lucerne on a steamship cruise.',
  },
  {
    rating: 3.0,
    reviewCount: 10,
    imgSrc:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/98/92/20/looking-back-as-the-cruise.jpg?w=1000&h=500&s=1',
    title: '시애틀',
    description:
      '시애틀에서는 유리 그리드와 기이한 형상, 4개의 층을 오르는 “북 스파이럴”을 볼 수 있는 경이로운 현대 건축물인 중앙 공공 도서관에 꼭 방문해야 합니다. 파이크스 팰리스 마켓으로 이동하면 원조 스타벅스뿐 아니라 생선을 이리저리 던지는 생선 장수를 만날 수 있습니다. 도시의 중심에는 다채롭고 섬세한 작품으로 당신을 놀라게 할 치훌리 유리 정원이 있습니다. 스페이스 니들 정상에서는 주변의 산맥과 퓨젓 사운드를 파노라마처럼 볼 수 있습니다.',
  },
  {
    rating: 2.5,
    reviewCount: 0,
    imgSrc:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/7c/25/af/wilder-ranch-state-park.jpg?w=1000&h=500&s=1',
    title: '샌터크루즈',
    description:
      '캘리포니아의 전형적인 해변 마을 산타크루스! 하와이의 왕족이 처음으로 본토에서 서핑을 시작했던 곳입니다. 이곳에는 전설적인 산타크루스 비치 보드워크를 비롯해 보행자 도로에 가로수가 길게 늘어선 다운타운, 몬테레이만 국립해양보호구역까지 반 마일가량 펼쳐지는 산타크루스 시립 부두 등이 있습니다. 또 다른 하이라이트로 UC 산타크루스, 산타크루스 서핑 박물관 및 인근의 삼나무 숲을 뽑을 수 있습니다.',
  },
  {
    rating: 5.0,
    reviewCount: 1,
    imgSrc:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/6f/a3/8c/photo0jpg.jpg?w=1000&h=600&s=1',
    title: '클라톤 온 씨',
    description: '',
  },
];

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
  console.log('file', file);
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
        rating={resort.similarity}
        reviewCount={resort.photos.length}
        imgSrc={resort.photos[0].dataurl}
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
