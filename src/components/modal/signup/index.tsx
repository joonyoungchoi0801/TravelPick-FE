import styles from './Signup.module.scss';
import closeIcon from '@/assets/close.svg';
import { useForm } from 'react-hook-form';

interface SignupModalProps {
  onClose: () => void;

  setLoginModalOpen: () => void;
}

interface SignupFormData {
  email: string;
  password: string;
  name: string;
}

function SignupModal({ onClose, setLoginModalOpen }: SignupModalProps) {
  const { handleSubmit, register } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.signupModal}>
        <img
          src={closeIcon}
          alt="Close"
          className={styles.closeIcon}
          onClick={onClose}
        />
        <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.signupTitle}>회원가입</div>
          <div className={styles.signupInputContainer}>
            <label className={styles.signupLabel}>이름</label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              className={styles.signupInput}
              {...register('name', { required: true })}
            />
          </div>
          <div className={styles.signupInputContainer}>
            <label className={styles.signupLabel}>이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={styles.signupInput}
              {...register('email', { required: true })}
            />
          </div>
          <div className={styles.signupInputContainer}>
            <label className={styles.signupLabel}>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={styles.signupInput}
              {...register('password', { required: true })}
            />
          </div>
          <button type="submit" className={styles.signupButton}>
            회원가입
          </button>
          <div className={styles.signupFooter}>
            <span className={styles.signupFooterText}>계정이 있으시면?</span>
            <button
              className={styles.signupFooterButton}
              onClick={setLoginModalOpen}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
