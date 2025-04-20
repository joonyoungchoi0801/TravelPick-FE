import { useForm, useWatch } from 'react-hook-form';
import styles from './Review.module.scss';
import closeIcon from '@/assets/close.svg';

interface ReviewModalProps {
  onClose: () => void;
}
interface ReviewFormData {
  rating: number;
  content: string;
  imageUrl?: string;
}

function ReviewModal({ onClose }: ReviewModalProps) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>();
  const contentValue = watch('content', '');

  const onSubmit = (data: ReviewFormData) => {
    console.log(data);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.reviewModal}>
        <img
          src={closeIcon}
          alt="Close"
          className={styles.closeIcon}
          onClick={onClose}
        />
        <form className={styles.reviewForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.reviewTitle}>리뷰 작성</div>
          <div className={styles.ratingWrapper}>
            <label className={styles.label}>평점</label>
            <select
              className={styles.reviewSelect}
              {...register('rating', { required: true })}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className={styles.reviewInputContainer}>
            <label className={styles.label}>리뷰 내용</label>
            <textarea
              placeholder="리뷰 내용을 입력하세요(최소 30자 이상)"
              className={styles.reviewInput}
              {...register('content', {
                required: true,
                minLength: {
                  value: 30,
                  message: '최소 30자 이상 입력해주세요.',
                },
              })}
            />
            <div className={styles.reviewInputCountContainer}>
              {errors.content && (
                <p className={styles.errorMessage}>{errors.content.message}</p>
              )}
              <span className={styles.reviewInputCount}>
                {contentValue.length}자
              </span>
            </div>
          </div>
          <div className={styles.imgUploadContainer}>
            <label className={styles.label}>사진 업로드 (드래그 가능)</label>
            <input
              type="file"
              accept="image/*"
              className={styles.imgUploadInput}
              {...register('imageUrl')}
            />
          </div>
          <button type="submit" className={styles.reviewButton}>
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;
