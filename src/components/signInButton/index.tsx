import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export const SignInButton = () => {
  const isUserLoggedIn = true;
  const userName = "Lucas Gomes";

  return isUserLoggedIn ? (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="var(--green)" />
      {userName}
      <FiX color="var(--gray-500)" />
    </button>
  ) : (
    <button type="button" className={styles.signInButton}>
      <FaGithub color="var(--yellow)" />
      Sign in with Github
    </button>
  );
};
