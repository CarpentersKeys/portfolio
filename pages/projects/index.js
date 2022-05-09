import Image from 'next/image';
import styles from '../../styles/Projects.module.scss'

export async function getStaticProps() {

    return fetch('https://api.github.com/users/CarpentersKeys/repos')
        .then(resp => resp.json())
        .then(async json => (
            Promise.all(
                json.map(repo => fetch(repo.statuses_url))
            )
                .then(respArr => (Promise.all(respArr.map((resp) => resp.json()))))
                .then(statuses => (
                    {
                        props: {
                            repos: json,
                            statuses,
                        }
                    })
                )
        ))
}


export default function Projects({ repos, statuses }) {
    console.log('repos:', repos);
    console.log('statuses:', statuses)

    return (
        <div className={styles.background}>
            <section className={styles.projects}>
                <h2>projects</h2>

                {
                    repos.map((repo, ind) => (
                        <article id={styles.firstProj} key={ind}>
                            <h4>porjstatus</h4>
                            <h3>{repo.name}</h3>
                            <p>{repo.description}</p>
                            <div id={styles.techCont}>
                                <h4>tech</h4>
                                <div id={styles.techUl}>
                                    <ul>
                                        horizontal list
                                        <li>html</li>
                                        <li>css</li>
                                        <li>js</li>
                                        <li>next</li>
                                        <li>react</li>
                                    </ul>
                                </div>
                            </div>
                            <div id={styles.imageCont}>
                                <Image id={styles.art} src='/white-center.jpg' width='156' height='131px' alt='art' />
                            </div>
                        </article>
                    ))
                }

            </section>
        </div>
    )
}