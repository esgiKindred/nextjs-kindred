import styles from "./circle.module.css";

export default function circle() {
  return (
    <div>
      <div className={styles.circleImg}></div>
      <div className={styles.circleSecondary}></div>
      <div className={styles.circleTertiary}></div>
    </div>
  );
}
