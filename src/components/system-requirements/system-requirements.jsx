import React from "react";
import styles from "./system-requirements.module.css";

function SystemRequirements({ platforms }) {
  const platformElements = platforms
    ? platforms.map(({ requirements, platform }) => {
        return (
          (requirements.minimum || requirements.recommended) && (
            <div>
              <h2>System requirements for {platform.name}</h2>
              {requirements.minimum && (
                <p className={styles.requirementsBlock}>
                  <span className={styles.minmax}>Minimum:</span>
                  {requirements.minimum.replace("Minimum:", "")}
                </p>
              )}
              {requirements.recommended && (
                <p className={styles.requirementsBlock}>
                  <span className={styles.minmax}>Recommended:</span>
                  {requirements.recommended.replace("Recommended:", "")}
                </p>
              )}
            </div>
          )
        );
      })
    : null;
  return <div className={styles.main}>{platformElements}</div>;
}

export default SystemRequirements;
