"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  
  const { items, lifetimeProfit } = useSelector((state: RootState) => state.cart);

  const showNavbar = pathname === "/shop" || pathname === "/checkout";

  if (!showNavbar) return null;

  const pendingTotal = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">🍋 LE MON <span className={styles.logoAlt}>NOIRE</span></Link>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.links}>
          <Link href="/shop" className={pathname === "/shop" ? styles.active : ""}>
            La Carte
          </Link>
          
          <Link href="/checkout" className={styles.cartIcon}>
            <span className={styles.badge}>🛒 {items.length}</span>
            <span className={styles.pendingPrice}>({pendingTotal.toFixed(2)}€)</span>
          </Link>
        </div>
        <div className={styles.ledger}>
          <span className={styles.label}>TOTAL PROFITS: </span>
          <span className={styles.value}>{lifetimeProfit.toFixed(2)}€</span>
        </div>
      </div>
    </nav>
  );
}