import styles from "../components/header.module.scss";
import Image from "next/image";
import SearchSelect from "./_components/searchSelect/searchSelect";
import ThemeToggle from "./_components/themeToggle/themeTooggle";
import UserAvatar from "./_components/UserAvatar/userAvatar";
export default function header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__Item}>
          <div className={styles.header__buttons}>
            <button className={styles.header__button}>
              <Image
                src="/images/Icons/grid.svg"
                alt="grid"
                width={24}
                height={24}
              />
            </button>
            <button className={styles.header__button}>
              <Image
                src="/images/Icons/bell.svg"
                alt="bell"
                width={24}
                height={24}
              />
            </button>
          </div>

          <span className={styles.header__location}>
            <Image
              src="/images/Icons/pin.svg"
              alt="pin"
              width={24}
              height={24}
            />
            Dhaka,Bangladesh
          </span>
        </div>
        <div>
          <SearchSelect />
        </div>
        <div className={styles.header__Item}>
          <ThemeToggle />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
