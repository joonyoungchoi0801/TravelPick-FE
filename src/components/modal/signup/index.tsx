import styles from './Signup.module.scss';
import closeIcon from '@/assets/close.svg';
import axios from 'axios';
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

  const onSubmit = async (data: SignupFormData) => {
    const { email, password, name } = data;
    const apiUrl = import.meta.env.VITE_AUTH_URL;
    const requestBody = { email, password, name };

    try {
      const response = await axios.post(`${apiUrl}/register`, requestBody, {
        withCredentials: true,
      });
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('isLogin', 'true');
      onClose();
    } catch (error) {
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
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
