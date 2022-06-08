import styles from './index.module.scss';
import Head from 'next/head';

export default function Index() {

  return (
    <div>
      <section id={styles.intro}>
        <div id={styles.contentCard}>
          <p className={styles.greeting}>hi, I&apos;m<span> <span className={styles.capital}>J</span>oshua </span>(he/him).</p>

          <h2><span className={styles.capital}>I</span> taught myself to develop web apps.</h2>

          <p>since achieving my license as a registered electrician <span className={styles.capital}>I</span>&apos;ve set my sights on a technical career. so far <span className={styles.capital}>I</span>&apos;ve focused my attention on technologies that work on the web.</p>
        </div>
      </section>
    </div>
  )
}