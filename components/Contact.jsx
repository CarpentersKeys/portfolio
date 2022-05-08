import styles from '../styles/Contact.module.scss';

export default function Contact() {
    return (
        <section id={styles.contact}>
            <div id={styles.textCont}>
                <h2>Inquiries</h2>
                <p>I&apos;m seeking employment, training, and peers in web technologies. Particularly using javascript, react, and nextjs.</p>
            </div>
            <div id={styles.iconsCont}>
                <p className={styles.contact}>Here&apos;s my <a href='mailto:joneilltechnical@gmail.coma'>email</a>.</p>
                <p className={styles.contact}>Just want to <a href='https://discordapp.com/users/Wheelwright#7659'>chat</a>?</p>
            </div>
        </section>
    )
}