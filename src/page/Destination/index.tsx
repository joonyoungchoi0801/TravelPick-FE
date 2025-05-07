import styles from "./Destination.module.scss";
import Layout from "../../components/layout";

import { useState } from "react";
import Carousel from "../../components/Carousel";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import ReviewBox from "../../components/reviewBox";
import ReviewModal from "../../components/modal/review";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetDetailsData, GetDetailsVars } from "./Destination.type";

const containerStyle = { width: "100%", height: "100%" };

const reviewData = [
  {
    rating: 4.4,
    user: "최준영",
    date: "2025.04.01",
    content:
      "호이안에서 차로 30분 거리의 미케 비치는 생각보다 한적하고, 투명한 바닷물이 인상적이었어요. 해질녘에는 노을빛이 반사되어 사진 찍기 좋고, 해산물 파빌리온에서 즐기는 회와 맥주 한 잔은 잊지 못할 추억이었습니다.",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/be/64/photo6jpg.jpg?w=1200&h=-1&s=1",
  },
  {
    rating: 4.4,
    user: "김철수",
    date: "2024.11.01",
    content:
      "구름다리를 걷는 순간 마치 동화 속에 들어온 듯한 느낌이었어요. 정상에 올라가면 프랑스 마을 느낌의 건축물과 깔끔한 정원이 펼쳐지고, 케이블카에서 보는 산악 풍경이 환상적입니다",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f3/cf/caption.jpg?w=1200&h=-1&s=1",
  },

  {
    rating: 4.4,
    user: "이영희",
    date: "2024.10.01",
    content:
      "한 끼쯤은 ‘반짜인 게 홍반’에서 먹어야 해요. 신선한 게살 요리와 매콤 달콤한 소스, 그리고 밥과 찰떡궁합! 가격도 합리적이어서 현지인과 여행객 모두에게 인기 만점이었습니다.",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/bf/02/f6/nui-son-tra.jpg?w=1200&h=-1&s=1",
  },
  {
    rating: 4.4,
    user: "김주현",
    date: "2024.09.01",
    content:
      "대리석 산을 오르면 사원이 숨어 있어서 신비로워요. 좁은 동굴을 지나 숲길을 따라 오르다 보면, 정상에서 다낭 시내와 해변이 한눈에 들어옵니다. 운동도 되고, 힐링도 되는 코스예요.",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/bc/ad/20/danang-marble-mountains.jpg?w=1200&h=-1&s=1",
  },
  {
    rating: 3.4,
    user: "박지민",
    date: "2024.08.01",
    content:
      "밤이 되면 용다리가 형형색색 조명으로 빛나고, 주말에는 용 머리에서 불과 물을 뿜어요. 다낭 강변을 산책하며 맛본 길거리 커피와 달달한 코코넛 주스는 낮과는 또 다른 매력을 선사했습니다.",
  },
];
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
    getLocation(id: $id) {
      latitude
      longitude
    }
    getReview(id: $id) {
      id
      content
      created
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
  const getLocation = data?.getLocation;
  const getReview = data?.getReview;
  console.log(getResort, getLocation, getReview);
  // const [rating, setRating] = useState(4.4);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const center = getResort?.ancestor
    ? {
        lat: getResort?.ancestor.longitude,
        lng: getResort?.ancestor.latitude,
      }
    : { lat: 37.2934, lng: 126.9747 };

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
            <span
              className={styles.reviewWrite}
              onClick={() => setIsReviewModalOpen(true)}
            >
              리뷰 작성
            </span>
          </div>
          <div className={styles.bar} />
          {reviewData.map((review, index) => (
            <ReviewBox
              key={index}
              user={review.user}
              date={review.date}
              content={review.content}
              imageUrl={review?.imageUrl}
            />
          ))}
        </div>
        {isReviewModalOpen &&
          ReactDOM.createPortal(
            <ReviewModal onClose={() => setIsReviewModalOpen(false)} />,
            document.getElementById("modal-root") as HTMLElement
          )}
      </div>
    </Layout>
  );
}
export default DestinationPage;
