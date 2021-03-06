import styles from "../../styles/yourAccount/yourAccount.module.css";

import Link from "next/link";

export default function PlanDetails({ userData, divider }) {
  return (
    <section className={styles.section}>
      <div className={styles.headerContainer}>
        <h2 className={styles.subHeaders}>PLAN DETAILS</h2>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.userInfo}>
          <div className={styles.userInfoTitle}>
            <p className={styles.userEmail}>
              {userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1)}
            </p>
          </div>
          {divider ? "" : <hr className={styles.divider} />}
          <div className={styles.userInfoLink}>
            <p className={styles.linkUpdate}>
              <Link href="/yourAccount/changePlan">
                <a>Change plan</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
