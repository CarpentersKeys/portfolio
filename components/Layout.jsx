import Link from 'next/link';
import Head from 'next/head';
import styles from './Layout.module.scss';
import { AiFillGithub, } from 'react-icons/ai';
import { WiSunset } from 'react-icons/wi';
import Contact from './Contact';

export default function Layout({ children, pageTitle }) {

    return (
        <div >
            <div id={styles.layout}>
                <Head>
                    <title>{`Joshua O'Neill Web Developer Portfolio. Page: ${pageTitle}`}</title>
                </Head>
                <nav>
                    <div id={styles.mainUl}>
                        <ul>
                            <li><h1><Link href='/'><a><WiSunset id={styles.icon} />Joshua</a></Link></h1></li>
                            <li><Link href='/projects'>projects</Link></li><div>.</div>
                            <li><Link href='https://resume.io/r/srFhKDi7i' target='_blank' rel='noreferrer'>resume</Link></li><div>.</div>
                            <li><Link href='/about'>about</Link></li><div>.</div>
                            <li><Link href='/contact'>contact</Link></li><div>()</div>
                        </ul>
                    </div>
                    <div className={styles.divider} ><div style={{ height: '50%', backgroundColor: 'var(--prim-clr)', width: '3px' }}></div> </div>
                    <div id={styles.offsiteUl}>
                        <ul>
                            <li>
                                <a aria-label='Joshua&apos;s git hub' className={styles.iconLink} rel="noreferrer noopener" target="_blank" href="https://github.com/CarpentersKeys">
                                    <div >
                                        <AiFillGithub />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav >
            </div >
            <div id={styles.topGrad}></div>
            {children}
            <div id={styles.botGrad}></div>
            <footer id={styles.footer}>
                <Contact />
            </footer>
            <div id={styles.spacerBot}></div>
        </div>
    )
}