import styles from "./card-point.module.css";

export default function CardPoint({title,points}) {
    return (
       <div className={styles.background}>
           <h4 className={styles.title}>{title}</h4>
           <h1 className={styles.points}>{points}</h1>
       </div>
    );
}
