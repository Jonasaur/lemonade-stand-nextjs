import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Le Mon Noire</h1>
      </div>
      <div className={styles.menuBackground}>
        <div className={styles.linkWrapper}>
          <Link href="/shop">La Carte</Link>
          <Link href="/checkout">Le Checkout</Link>
        </div>
      </div>
    </main>
  );
}
