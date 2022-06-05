import styles from './index.module.scss';

export default function Index() {

  return (
    <div>
      <section id={styles.intro}>
        <div id= {styles.contentCard}>
          <p className={styles.greeting}>Hi, I&apos;m<span> Joshua </span>(he/him).</p>

          <h2>I make web apps.</h2>

          <p>I do well with direct communication, working with people whose goals are aligned.
            Currently I&apos;m developing some portfolio <a href="https://rememblance.vercel.app/">projects</a> based on my interests.
          </p>
        </div>
      </section>
    </div>
  )
}