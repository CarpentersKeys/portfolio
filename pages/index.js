import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Joshua O&apos;Neill Portfolio</title>
        <meta name="Joshua O&apos;Neill" content="Web developer Portfolio" />
      </Head>
      <section id="intro">
        <p className={styles.name}>Hi, I&apos;m<span> Joshua </span>(he/him).</p>

        <h2>I make web apps.</h2>

        <p>I do well with direct communication, working with people whose goals are aligned.
          Currently I&apos;m devloping some portfolio
          <a href="https://rememblance.vercel.app/">projects</a>
          based on my interests.
        </p>
      </section>

    </div>
  )
}
