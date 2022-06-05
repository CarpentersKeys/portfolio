import Image from 'next/image';
import { githubReposQuery as query } from '../../lib/queryStrings';
import graphqlFetch from '../../lib/graphqlFetch';
import styles from '../../styles/Projects.module.scss'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export async function getStaticProps() {

    const graphResp = await graphqlFetch({ query });
    const unformatted = graphResp.data.viewer.repositories.nodes;
    const repos = unformatted.map(repo => {
        const {
            name,
            homepageUrl,
            url: githubUrl,
            openGraphImageUrl: imageUrl,
            pushedAt: lastPushAt,
            languages,
            repositoryTopics
        } = repo;
        const topics = languages.nodes.map(lang => lang.name)
            .concat(
                repositoryTopics.nodes
                    .map(obj => obj.topic.name)
                    .filter(e => e !== 'portfolio')
            )
        const description = repo.description?.slice(0, 30).concat('..');
        return { name, homepageUrl, githubUrl, imageUrl, description, lastPushAt, topics };
    })

    return {
        props: { repos, },
        revalidate: 60 * 30,
    }
}


export default function Projects({ repos }) {
    const [reposState, reposStateSet] = useState(repos);


    useEffect(() => {
        const topicsTimer = setTimeout(() => reposStateSet((prev) => (

            prev.map(repo => {
                const { topics, ...rest } = repo;
                const newTopics = topics.slice()
                    .sort(() => Math.random() - .5)
                    .slice(0, 5);

                return { topics: newTopics, ...rest };
            })
        )

        ), 6000);

        return () => { clearTimeout(topicsTimer); };
    }, [repos])

    return (
        <div id={styles.projects}>
            <section id={styles.mainSection}>
                <main>
                    {
                        reposState.map((repo, i) => {
                            const { name, homepageUrl, githubUrl, imageUrl, description, lastPushAt, topics } = repo;

                            return (
                                <Link href={`/projects/${name}`} key={i + 'i'}>
                                    <div className={styles.projectCard} >
                                        {/* style text top left */}
                                        <div className={styles.left}>
                                            <div id={styles.header}>
                                                <span className={styles.offsiteLinks}>
                                                    <h4>status</h4>
                                                    <span className={styles.linkDivider}>|</span>
                                                    <a
                                                        target='_blank' rel='noreferrer'
                                                        href={homepageUrl || githubUrl}>
                                                        {homepageUrl ? 'production' : 'development'}
                                                    </a>
                                                </span>
                                                <h3 id={styles.title}>{name}</h3>
                                                <p className={styles.description}>{description}</p>
                                            </div>
                                            {/* may conditionally render if no deployment */}
                                            <div className={styles.tagsCard}>
                                                <ul>
                                                    {
                                                        topics.map((e, k) => <li key={k + 'ijk'}>{'#' + e + ' '}</li>)
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={styles.right}>
                                            <div className={styles.imageCard}>
                                                {/* probably what I need here  */}
                                                <Image
                                                    alt='repository image'
                                                    className={styles.image}
                                                    // maybe format images to be wide bannerlike things with a couple items on them
                                                    src={imageUrl}
                                                    // width='317px' height='317px'
                                                    layout="fill"
                                                    priority
                                                    objectFit="contain"
                                                    objectPosition='center'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </main>
            </section>
        </div >
    )
}