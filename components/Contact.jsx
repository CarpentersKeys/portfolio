import styles from './Contact.module.scss';
import { GrMail } from 'react-icons/gr'
import { FaDiscord } from 'react-icons/fa'

export default function Contact() {
    return (
        <section id={styles.contact}>
            <div id={styles.textCont}>
                <h2>Inquiries</h2>
                <p>I&apos;m seeking employment, mentorship, and peers in web technologies. particularly using javascript, react, and nextjs.</p>
            </div>
                <div id={styles.topGrad}></div>
            <div id={styles.iconsCont}>
                <div>
                    <p id={styles.iconText}>Here&apos;s my email.</p>
                    <a href='mailto:joneilltechnical@gmail.com'><GrMail /></a>
                </div>
                <div>
                    <p id={styles.iconText}>Just want to chat?</p>
                    <a href='https://discordapp.com/users/Wheelwright#7659'><FaDiscord /></a>
                </div>
            </div>
        </section>
    )
}