import Contact from '../components/Contact';
import styles from '../styles/Home.module.scss';

export default function Home() {

  return (
    <div>
      <section id={styles.intro}>
        <p className={styles.name}>Hi, I&apos;m<span> Joshua </span>(he/him).</p>

        <h2>I make web apps.</h2>

        <p>I do well with direct communication, working with people whose goals are aligned.
          Currently I&apos;m developing some portfolio <a href="https://rememblance.vercel.app/">projects</a> based on my interests.
        </p>
      </section>

      <footer id={styles.contact}>
        <Contact />
      </footer>
    </div>
  )
}