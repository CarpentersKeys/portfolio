import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Layout.module.scss';

export default function Layout({ pageTitle }) {

    return (
        <div id={styles.layout}>
            <Head>
                <title>{`Joshua O&apos;Neill Web Developer Portfolio: ${pageTitle}`}</title>
            </Head>
            <nav>
                <ul id={styles.mainUl}>
                    <li><h1><Link className={styles.link} href='/'>Joshua</Link></h1></li>
                    <li><Link className={styles.link} href='/projects'>Projects</Link></li>
                    <li><Link href='/resume'>Resume</Link></li>
                    <li><Link href='/about'>About</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                </ul>
                <ul id={styles.offsiteUl}>
                    <h2>Offsite</h2>
                    <li><p><a rel="noreferrer noopener" target="_blank" href="https://github.com/CarpentersKeys">Github</a></p></li>
                </ul>
            </nav>
        </div>
    )
}