import { Component } from "react";
import { Button } from "react-bulma-components";

import styles from "./back-button.module.css";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <span className={styles.back_button} onClick={() => router.back()}>
      <i className="bi bi-chevron-left"></i>
    </span>
  );
}
