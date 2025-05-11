import { useMemo, useState } from 'react';
import Layout from '../../components/layout';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import { LocationData, RegisterForm } from './Register.type';
import { timezones } from '../../util/timezone';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
const containerStyle = {
  width: '100%',
  height: '500px',
};
const center = {
  lat: 37.5665,
  lng: 126.978,
};
const SEARCH_LOCATIONS = gql`
  query SearchLocations($query: String!, $count: Int!) {
    searchLocations(locationSearchDto: { query: $query, count: $count }) {
      id
      name
      timezone
    }
  }
`;
const CREATE_RESORT = gql`
  mutation CreateResort(
    $name: String!
    $parent_id: Int
    $latitude: Float!
    $longitude: Float!
    $timezone: String!
    $description: String!
  ) {
    createResort(
      resortRegisterDto: {
        name: $name
        parent_id: $parent_id
        latitude: $latitude
        longitude: $longitude
        timezone: $timezone
        description: $description
      }
    ) {
      id
      name
    }
  }
`;
function Register() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const [searchLocations, { data }] = useLazyQuery(SEARCH_LOCATIONS);
  const [createResort] = useMutation(CREATE_RESORT, {
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });
  const [ancestorValue, setAncestorValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const descriptionValue = watch('description', '');

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (q: string) => searchLocations({ variables: { query: q, count: 5 } }),
        300
      ),
    [searchLocations]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (e.key === 'Enter') {
      if (value.trim()) {
        debouncedSearch(value);
      } else {
        setShowDropdown(false);
      }
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAncestorValue(value);
    setShowDropdown(true);
  };

  const handleSelect = (location: LocationData) => {
    setAncestorValue(location.name);
    setValue('parent_id', location.id);
    setShowDropdown(false);
  };

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
    }
  };
  const onSubmit = async (data: RegisterForm) => {
    if (markerPosition) {
      const { lat, lng } = markerPosition;
      try {
        const res = await createResort({
          variables: {
            name: data.name,
            parent_id: data.parent_id,
            latitude: lat,
            longitude: lng,
            timezone: data.timezone,
            description: data.description,
          },
        });
        if (res.data) {
          alert('여행지가 등록되었습니다.');
          navigate('/home');
        }
      } catch (error) {
        alert('여행지 등록에 실패했습니다.');
      }
    } else {
      alert('위치를 선택해주세요.');
    }
  };

  return (
    <Layout>
      <div className={styles.content}>
        <h1 className={styles.title}>여행지 등록</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <label htmlFor="name" className={styles.label}>
              이름
            </label>
            <input
              type="text"
              className={styles.input}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className={styles.error}>이름을 입력해주세요.</span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="lat,lng" className={styles.label}>
              위치 선택
            </label>
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onClick={handleMapClick}
              >
                {markerPosition && <Marker position={markerPosition} />}
              </GoogleMap>
            </LoadScript>
          </div>
          <div className={`${styles.inputWrapper} ${styles.ancestor}`}>
            <label htmlFor="ancestor" className={styles.label}>
              상위 지역 선택
            </label>
            <input
              type="text"
              className={styles.input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={ancestorValue}
              autoComplete="off"
              placeholder="상위 지역 검색"
            />
            <input
              type="hidden"
              {...register('parent_id')}
              value={ancestorValue}
            />
            {showDropdown && data?.searchLocations?.length > 0 && (
              <ul className={styles.dropdown}>
                <h3>검색결과</h3>
                {data.searchLocations.map((option: LocationData) => (
                  <li
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className={styles.dropdownItem}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="timezone" className={styles.label}>
              표준시 선택
            </label>
            <select
              id="timezone"
              className={styles.input}
              {...register('timezone', { required: true })}
            >
              <option value="">표준시를 선택하세요</option>
              {timezones.map((timezone) => (
                <option key={timezone.value} value={timezone.value}>
                  {timezone.label}
                </option>
              ))}
            </select>
            {errors.timezone && (
              <span className={styles.error}>표준시를 선택해주세요.</span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="description" className={styles.label}>
              설명
            </label>
            <textarea
              placeholder="리뷰 내용을 입력하세요(최소 30자 이상)"
              className={styles.textarea}
              {...register('description', {
                required: true,
                minLength: {
                  value: 30,
                  message: '최소 30자 이상 입력해주세요.',
                },
              })}
            />
            <div className={styles.reviewInputCountContainer}>
              {errors.description && (
                <span className={styles.error}>설명을 입력해주세요.</span>
              )}
              <span className={styles.reviewInputCount}>
                {descriptionValue.length}자
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            onSubmit={handleSubmit(onSubmit)}
          >
            제출하기
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
