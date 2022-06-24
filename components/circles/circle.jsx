import { Component } from "react";
import { Button } from "react-bulma-components";

import styles from "./circle.module.css";
import { useRouter } from "next/router";

export default function circle() {
  return (
    <div>
      <div className={styles.circleImg}></div>
      <div className={styles.circleSecondary}></div>
      <div className={styles.circleTertiary}></div>
    </div>
  );
}
