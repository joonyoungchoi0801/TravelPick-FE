import styles from './Destination.module.scss';
import Layout from '../../components/layout';
import {
  ZeroRating,
  OneRating,
  TwoRating,
  ThreeRating,
  FourRating,
  FiveRating,
} from '../../components/travelbox/circle';
import { useState } from 'react';
import Carousel from '../../components/Carousel';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };
const center = { lat: 16.0544, lng: 108.2022 };

function DestinationPage() {
  const [rating, setRating] = useState(4.4);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const Rating = () => {
    switch (Math.round(rating)) {
      case 0:
        return <ZeroRating />;
      case 1:
        return <OneRating />;
      case 2:
        return <TwoRating />;
      case 3:
        return <ThreeRating />;
      case 4:
        return <FourRating />;
      case 5:
        return <FiveRating />;
      default:
        return <FiveRating />;
    }
  };
  return (
    <Layout>
      <div className={styles.content}>
        <span className={styles.title}>다낭</span>
        <div className={styles.ratingWrapper}>
          <span className={styles.rating}>{rating}</span>
          <Rating />
        </div>
        <Carousel />
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <span className={styles.infoTitle}>여행지 정보</span>
            <span className={styles.infoContent}>
              다낭은 태평스럽고 상냥한 데, 그 이유는 만나는 모든 사람들이 방금
              맛있는 식사를 마친 후이기 때문일 수 있습니다. 요리 여행은 문자
              그대로 지역의 향기를 맛볼 수 있는 아주 좋은 경험입니다. 굵은 국수
              수프와 풍미 있는 거리의 음식들로 배를 채운 후에 마블 산의 석회
              동굴과 불교 사원 동굴을 걸어서 방문해 보십시오.
            </span>
          </div>

          <div className={styles.map}>
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default DestinationPage;
