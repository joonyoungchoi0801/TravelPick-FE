import styles from './Signin.module.scss';
import closeIcon from '@/assets/close.svg';

import { useForm } from 'react-hook-form';

interface SigninModalProps {
  onClose: () => void;
  setSignupModalOpen: () => void;
}

interface SigninFormData {
  email: string;
  password: string;
}

function SigninModal({ onClose, setSignupModalOpen }: SigninModalProps) {
  const { handleSubmit, register } = useForm<SigninFormData>();

  const onSubmit = (data: SigninFormData) => {
    console.log(data);
  };
  const handleSignup = () => {
    setSignupModalOpen();
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.signinModal}>
        <img
          src={closeIcon}
          alt="Close"
          className={styles.closeIcon}
          onClick={onClose}
        />
        <form className={styles.signinForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.signinTitle}>로그인</div>
          <div className={styles.signinInputContainer}>
            <label className={styles.signinLabel}>이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={styles.signinInput}
              {...register('email', { required: true })}
            />
          </div>
          <div className={styles.signinInputContainer}>
            <label className={styles.signinLabel}>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={styles.signinInput}
              {...register('password', { required: true })}
            />
          </div>
          <button type="submit" className={styles.signinButton}>
            로그인
          </button>
          <div className={styles.signinFooter}>
            <span className={styles.signinFooterText}>계정이 없으신가요?</span>
            <button
              className={styles.signinFooterButton}
              onClick={() => handleSignup()}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninModal;
