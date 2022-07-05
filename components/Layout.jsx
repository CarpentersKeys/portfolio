import Link from 'next/link';
import Head from 'next/head';
import styles from './Layout.module.scss';
import { AiFillGithub, AiFillLinkedin} from 'react-icons/ai';
import { WiSunset } from 'react-icons/wi';
import Contact from './Contact';
import { useRouter } from 'next/router';
import formatPageTitle from '../lib/formatPageTitle';

export default function Layout({ children }) {
    const router = useRouter();
    const path = router.asPath;
    const pathTitle = path.length < 2 && 'Home' || formatPageTitle(path);
    const pageTitle = `Joshua O'Neill Web Developer Portfolio${pathTitle && ' | ' + pathTitle}`;
    const ogUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.DEFAULT_URL;

    return (
        <div className={styles.wholeView}>
            <Head>
                <meta property="og:image" content="https://repository-images.githubusercontent.com/488019984/9b387b39-380c-4547-99fc-e4a6f33efb35" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content="My technical efforts and endeavours" />
                <meta property="og:type" content="Portfolio Website" />
                <meta property="og:url" content={ogUrl} />
                <title>
                    {pageTitle}
                </title>
            </Head>
            <div className={styles.top}>
                <div id={styles.layout}>
                    <nav>
                        <div id={styles.mainUl}>
                            <ul>
                                <li><h1><Link href='/'><a><WiSunset id={styles.icon} />Joshua</a></Link></h1></li>
                                <li ><Link href='/projects'>projects</Link></li><div>.</div>
                                <li ><a href='https://docs.google.com/document/d/18whoBoC2ss69v1GDY41aebRMeTZdkbuxen42-HFDQ4s/edit?usp=sharing'
                                    target='_blank' rel='noreferrer'>
                                    resume
                                </a></li><div>.</div>
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
                                <li>
                                    <a aria-label='Joshua&apos;s linked in' className={styles.iconLink} rel="noreferrer noopener" target="_blank" href="https://www.linkedin.com/in/joshua-o-neill-56b531241/">
                                        <div >
                                            <AiFillLinkedin />
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