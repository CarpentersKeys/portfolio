import Image from 'next/image';
import styles from '../../styles/Projects.module.scss'
// import { JSDOM } from 'jsdom';

export async function getStaticProps() {

    // fetch logic

    // get repos from github
    fetch('https://api.github.com/users/CarpentersKeys/repos')
        // check to make sure response ok and json
        .then(resp => {
            return resp.ok && resp.headers.get('Content-Type').includes('application/json') && resp.json()
                || new Error(`github fetch error status: \n${resp.status}\n${resp.headers.get('Content-Type')}`)
        })
        .catch(err => err)
        // filter repos without 'portfolio' topic
        // map over repos
        // make fetch for languages, and html preview image
        // format into rep
        // format all repos into {props: ...}
        .then(repos => repos.filter(e => e.topics.includes('portfolio')))
        .then(repos => (
            repos.map(async (repo, i) => {
                // const languages = await fetch(repo.languages_url)
                // JSDOM.fromUrl(repo.html_url.contentType)
                    // .then(result => console.log(result))
                    console.log(repos[0]);

            })
        ))
    // .then(async json => {
    //     return Promise.all(
    //         json.map(repo => {
    //             return {
    //                 languages: fetch(repo.languages_url),
    //                 previewImg: fetch(repo.html_url)
    //             }

    //         })
    //     )
    //         .then(respArr => (Promise.all(respArr.map((resp) => resp.json()))))
    //         .then(langs => {
    //             const repos = json
    //                 .filter(e => e.topics.includes('portfolio'))
    //                 .map((e, i) => {
    //                     return {
    //                         ...e,
    //                         languages: langs[i]
    //                     }
    //                 })
    //             return {
    //                 props: {
    //                     repos
    //                 }
    //             };
    //         })
    // })
    return {props: 'aerg'};
}


export default function Projects({ repos }) {

    return (
        <div className={styles.background}>
            {/* <section className={styles.projects}>
                <h2>projects</h2>

                {
                    repos.map((repo, ind) => (
                        <article id={styles.firstProj} key={ind}>
                            <h4>{
                                repo.homepage !== '' && <a target='_blank' rel='noopener noreferrer' href={repo.homepage}>deployed</a>
                                || <a target='_blank' rel='noopener noreferrer' href={repo.html_url}>in progress</a>
                            }</h4>
                            <h3>{repo.name}</h3>
                            <p>{repo.description}</p>
                            <div id={styles.techCont}>
                                <div id={styles.techUl}>
                                    <ul>
                                        {
                                            Object.keys(repo.languages).map((e, i) => <li key={e + i}>{e}</li>)
                                                .concat(
                                                    repo.topics.filter(e => e !== 'portfolio')
                                                        .map((e, i) => <li key={e + i}>{e}</li>)
                                                ).slice(0, 5)
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div id={styles.imageCont}>
                                <Image id={styles.art} src='/white-center.jpg' width='156' height='131px' alt='art' />
                            </div>
                        </article>
                    ))
                }

            </section> */}
        </div>
    )
}