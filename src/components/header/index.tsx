import Image from "next/image";
import { ActiveLink } from "../activeLink";
import { SignInButton } from "../signInButton";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          alt="ig.news"
          width={110}
          height={110}
        />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
};
