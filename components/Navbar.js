import Link from "next/link";
import styles from "../styles/custom.module.css";
import Head from "next/head";

const Navbar = () => (
  <>
    <Head>
      <title>Fluent App</title>
    </Head>
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.navbarBrand}>Fluent App</a>
      </Link>
    </nav>
  </>
);

export default Navbar;
