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
                <div id={styles.mainUl}>
                    <ul>
                        <li><h1><Link href='/'>Joshua</Link></h1></li>
                        <li><Link href='/projects'>projects</Link></li>.
                        <li><Link href='/resume'>resume</Link></li>.
                        <li><Link href='/about'>about</Link></li>.
                        <li><Link href='/contact'>contact</Link></li>()
                    </ul>
                </div>
                <div className='divider' id={styles.bar}><div style={{height: '50%', backgroundColor: 'var(--prim-clr)', width: '3px'}}></div> </div>
                <ul id={styles.offsiteUl}>
                    <li><a className={styles.link} rel="noreferrer noopener" target="_blank" href="https://github.com/CarpentersKeys">Github</a></li>
                </ul>
            </nav>
        </div>
    )
}