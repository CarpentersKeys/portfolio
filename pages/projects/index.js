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
                        <div className={styles.projectCard} key={ind}>
                            <a href={`/projects/${repo.name}`}>
                                <article id={styles.firstProj}>
                                    {/* style text top left */}
                                    <h3>{repo.name}</h3>
                                    <h5>Status</h5>
                                    <a
                                        target='_blank' rel='noreferrer'
                                        href={repo.homepageUrl || repo.url}>
                                        <button>{repo.homepageUrl ? 'Production' : 'Development'}</button>
                                    </a>
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
                                                {/* probably what I need here  */}
                                        {/* <Image
                                            alt='repository image'
                                            className={styles.image}
                                            // maybe format images to be wide bannerlike things with a couple items on them
                                            src={imageUrl}
                                            // width='317px' height='317px'
                                            layout="fill"
                                            priority
                                            objectFit="none"
                                            objectPosition='center'
                                        /> */}
                                    </div>
                                </article>
                            </a>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}