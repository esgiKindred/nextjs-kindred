import React from "react";
import styles from "./text-area.css";

export default function TextArea({ placeholder }) {
  return (
    <div className="control">
      <textarea className={styles.textarea} placeholder={placeholder}></textarea>
    </div>
  );
}
