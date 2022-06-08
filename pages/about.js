import styles from './index.module.scss';

export default function Index() {

    return (
        <div>
            <section id={styles.intro}>
                <div id={styles.contentCard}>
                    <p className={styles.greeting}><span>.</span></p>

                    <h2>about <span className={styles.capital}>m</span>e</h2>

                    <p>here&apos;s where I&apos;ll tell a bit about myself.</p>
                    <br />
                    <p>I&apos;m a person who has always wanted to pursue a career where learning is a daily activity that compounds over time to yield results. Considering my tendencies when it comes to creative and recreational pursuits it&apos;s a surprise I hadn&apos;t arrived in the technical world sooner.</p>
                    <br />
                    <p>I&apos;ve had many a brush with technical adjacent technologies in the past. Diving into the beautiful documentation of <a target='_blank' rel='noreferrer' href='https://cycling74.com/products/max'>cycling &apos;74</a>s audio and visual design enviornments allowed me to organize and perform at engaging live electronic music events without the need for a keyboard or mouse. My independent preparation for a grueling 5 hour long examination with sparse study materials culminated in my licensing as a professional electrician. Inundating myself in the pursuit of understanding and fierce competitive spirit of the ancient game <a href='https://en.wikipedia.org/wiki/Go_(game)' target='_blank' rel='noreferrer'>baduk/go/weiqi</a> cemented my status among Dan level players. It&apos;s been made clear to me I have a propensity for falling in love with systems of mechanistic depth.</p>
                    <br />
                    <p>That brings us to the year I finally took my first steps into the technical world proper. On this site the reader will find evidence of my efforts. When I played my first game of go, it&apos;s seemingly endless depth frightened me, and I backed away. Shortly after, I read that commitments to daily progress at the outset are a good predictor of success in a given pursuit. At that time I made a chose to learn in a specific domain, with a specific frequency, and after more than a year I was rewarded with a specific lifelong skill that I cherish and maintain today. I develop programs now, I do it everyday, and I hope to align myself with good people who do the same.</p>
                </div>
            </section>
            <section>
            </section>
        </div>
    )
}