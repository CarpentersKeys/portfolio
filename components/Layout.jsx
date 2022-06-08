import Link from 'next/link';
import Head from 'next/head';
import styles from './Layout.module.scss';
import { AiFillGithub, } from 'react-icons/ai';
import { WiSunset } from 'react-icons/wi';
import Contact from './Contact';
import { useRouter } from 'next/router';
import formatPageTitle from '../lib/formatPageTitle';

export default function Layout({ children }) {
    const router = useRouter();
    const path = router.asPath;
    const pageTitle = path.length < 2 && 'Home' || formatPageTitle(path)

    return (
        <div className={styles.wholeView}>
            <Head>
                <title>
                    {`Joshua O'Neill Web Developer Portfolio${pageTitle && ' | ' + pageTitle}`}
                </title>
            </Head>
            <div className={styles.top}>
                <div id={styles.layout}>
                    <nav>
                        <div id={styles.mainUl}>
                            <ul>
                                <li><h1><Link href='/'><a><WiSunset id={styles.icon} />Joshua</a></Link></h1></li>
                                <li ><Link href='/projects'>projects</Link></li><div>.</div>
                                <li ><a href='https://resume.io/r/srFhKDi7i' target='_blank' rel='noreferrer'>resume</a></li><div>.</div>
                                <li ><Link href='/about'>about</Link></li><div>.</div>
                                <li ><Link href='/contact'>contact</Link></li><div>()</div>
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
                <div className={styles.main}>
                    <div id={styles.topGrad}></div>
                    {children}
                </div>
            </div>
            <footer id={styles.footer}>
                <div id={styles.botGrad}></div>
                <Contact />
            </footer>
        </div>
    )
}