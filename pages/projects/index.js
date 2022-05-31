import Image from 'next/image';
import { githubReposQuery as query } from '../../lib/queryStrings';
import graphqlFetch from '../../lib/graphqlFetch';
import styles from '../../styles/Projects.module.scss'

export async function getStaticProps() {

    const repos = await graphqlFetch({ query });
    const portfolioReposDetails = repos.data.viewer.repositories.nodes;
    console.log('index')

    return { props: { portfolioReposDetails } }
}


export default function Projects({ portfolioReposDetails }) {

    return (
        <div className={styles.background}>
            <section className={styles.projects}>
                <h2>projects</h2>

                {
                    portfolioReposDetails.map((repo, ind) => (
                        // style as card links to porject page
                        <article id={styles.firstProj} key={ind}>
                            <h4>{
                                // style as button top right
                                repo.homepageUrl !== '' && <a target='_blank' rel='noopener noreferrer' href={repo.homepageUrl}>production</a>
                                || <a target='_blank' rel='noopener noreferrer' href={repo.url}>development</a>
                            }</h4>
                            {/* style text top left */}
                            <h3>{repo.name}</h3>
                            {/* may conditionally render if no deployment */}
                            {/* <p>{repo.description}</p> */}
                            <div id={styles.techCont}>
                                <div id={styles.techUl}>
                                    <ul>
                                        {
                                            repo.languages.nodes.map((e, i) => <li key={e + i}>{e.name}</li>)
                                                .concat(
                                                    repo.repositoryTopics.nodes
                                                        .filter(e => e.name !== 'portfolio')
                                                        .map((e, i) => <li key={e + i}>{e.topic.name}</li>)
                                                ).slice(0, 5)
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div id={styles.imageCont}>
                                <Image id={styles.art} src={repo.openGraphImageUrl} width='156' height='131px' alt='art' />
                                {/* <Image width='156' height='131px' alt='art' src='https://commons.wikimedia.org/wiki/File:Robert_Delaunay,_1913,_Premier_Disque,_134_cm,_52.7_inches,_Private_collection.jpg#/media/File:Robert_Delaunay,_1913,_Premier_Disque,_134_cm,_52.7_inches,_Private_collection.jpg' /> */}
                            </div>
                        </article>
                    ))
                }

            </section>
        </div>
    )
}