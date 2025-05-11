import { useForm } from 'react-hook-form';
import styles from './Review.module.scss';
import closeIcon from '@/assets/close.svg';
import { gql, useMutation } from '@apollo/client';
interface ReviewModalProps {
  onClose: () => void;
  id: string | undefined;
}
interface ReviewFormData {
  rating: number;
  content: string;
  imageUrl?: FileList;
}

const CREATE_REVIEW = gql`
  mutation CreateReview(
    $resort_id: Int!
    $content: String!
    $photos: [String]
  ) {
    createReview(
      reviewRegisterDto: {
        resort_id: $resort_id
        content: $content
        photos: $photos
      }
    ) {
      content
      created
      id
    }
  }
`;

function ReviewModal({ onClose, id }: ReviewModalProps) {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>();
  const contentValue = watch('content', '');

  const [createReview] = useMutation(CREATE_REVIEW, {
    context: {
      fetchOptions: {
        credentials: 'include',
      },
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      let base64Image: string | null = null;

      if (data.imageUrl && data.imageUrl[0] instanceof File) {
        const file = data.imageUrl[0];

        const reader = new FileReader();

        base64Image = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      await createReview({
        variables: {
          resort_id: Number(id),
          content: data.content,
          photos: base64Image ? [base64Image] : [],
        },
      });
      alert('리뷰가 성공적으로 등록되었습니다.');
      onClose();
    } catch (error) {
      alert('리뷰 등록에 실패했습니다.');
    }
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
