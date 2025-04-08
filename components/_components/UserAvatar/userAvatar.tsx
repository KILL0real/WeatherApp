"use client";

import styles from "./userAvatar.module.scss";
import Image from "next/image";

export default function UserAvatar() {
  return (
    <button className={styles.avatarBtn} aria-label="User profile">
      <Image
        src="/images/Icons/avatar.png"
        alt="User Avatar"
        width={40}
        height={40}
      />
    </button>
  );
}
