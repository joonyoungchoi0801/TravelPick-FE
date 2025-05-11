import styles from './Destination.module.scss';
import Layout from '../../components/layout';

import { useState } from 'react';
import Carousel from '../../components/Carousel';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import ReviewBox from '../../components/reviewBox';
import ReviewModal from '../../components/modal/review';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GetDetailsData, GetDetailsVars } from './Destination.type';

const containerStyle = { width: '100%', height: '100%' };

const GET_DETAILS = gql`
  query GetDetails($id: Int!) {
    getResort(id: $id) {
      id
      name
      description
      ancestor {
        latitude
        longitude
      }
      photos {
        id
        index
        dataurl
      }
    }
    getReviews(resort_id: $id) {
      id
      content
      created
      user {
        name
      }
      photos {
        id
        index
        dataurl
      }
    }
  }
`;

function DestinationPage() {
  const { id } = useParams();
  const { data } = useQuery<GetDetailsData, GetDetailsVars>(GET_DETAILS, {
    variables: { id: Number(id) },
  });
  const getResort = data?.getResort;
  const getReviews = data?.getReviews;
  // const [rating, setRating] = useState(4.4);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const center = getResort?.ancestor
    ? {
        lat: getResort?.ancestor.latitude,
        lng: getResort?.ancestor.longitude,
      }
    : { lat: 37.2934, lng: 126.9747 };
  const reviewModalOpen = () => {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin) {
      setIsReviewModalOpen(true);
    } else {
      alert('로그인 후 이용 가능합니다.');
    }
  };
  return (
    <Layout>
      <div className={styles.content}>
        <span className={styles.title}>{getResort?.name}</span>
        {/* <div className={styles.ratingWrapper}>
          <span className={styles.rating}>{rating}</span>
          <Rating />
        </div> */}
        <Carousel images={getResort?.photos} />
        <div className={styles.infoWrapper}>
          <div className={styles.info}>
            <span className={styles.infoTitle}>여행지 정보</span>
            <span className={styles.infoContent}>{getResort?.description}</span>
          </div>

          <div className={styles.map}>
            <LoadScript googleMapsApiKey={apiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div className={styles.reviewWrapper}>
          <div className={styles.reviewTitleWrapper}>
            <span className={styles.reviewTitle}>리뷰</span>
            <span className={styles.reviewWrite} onClick={reviewModalOpen}>
              리뷰 작성
            </span>
          </div>
          <div className={styles.bar} />
          {getReviews?.map((review, index) => (
            <ReviewBox
              key={index}
              user={review.user.name}
              date={review.created}
              content={review.content}
              imageUrl={review?.photos[0]?.dataurl}
            />
          ))}
        </div>
        {isReviewModalOpen &&
          ReactDOM.createPortal(
            <ReviewModal id={id} onClose={() => setIsReviewModalOpen(false)} />,
            document.getElementById('modal-root') as HTMLElement
          )}
      </div>
    </Layout>
  );
}
export default DestinationPage;
