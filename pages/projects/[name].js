import graphqlFetch from "../../lib/graphqlFetch";
import { githubReposQuery as query } from "../../lib/queryStrings";
import styles from '../../styles/Project.module.scss';
import Image from 'next/image';
import spreadStringsOverRowsByChars from "../../lib/spreadStringsOverRowsByChars";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useEffect, useState } from "react";

// server build
export async function getStaticPaths() {
    const repos = await graphqlFetch({ query });
    const portfolioReposDetails = repos.data.viewer.repositories.nodes;
    const { name, ...repoDetails } = portfolioReposDetails[0];
    console.log('name:', name, 'det', repoDetails);

    return {
        paths: portfolioReposDetails.map(({ name, ...repoDetails }) => ({
            params: {
                name,
                repoDetails,
            },
        })),
        fallback: false,
    }
}

// server build and revalidate(every 30min)
export async function getStaticProps({ params: { name } }) {
    const repos = await graphqlFetch({ query });
    // fix this aweful query
    const props = repos.data.viewer.repositories.nodes.filter(repo => repo.name === name)[0];

    return {
        props,
        revalidate: 30 * 60,
    }
}

// client
export default function Project({
    name,
    homepageUrl,
    url: githubUrl,
    openGraphImageUrl: imageUrl,
    description,
    pushedAt: lastPushAt,
    languages,
    repositoryTopics
}) {

    const isLargeBrowser = useMediaQuery('(min-width: 1240px)');
    const isMediumBrowser = useMediaQuery('(min-width: 768px)');
    const [maxRowChars, maxRowCharsSet] = useState(null);
    const [initTags, initTagsSet] = useState([]);
    const [tags, tagsSet] = useState([]);

    useEffect(() => {
        initTagsSet(
            languages.nodes.map(lang => lang.name)
                .concat(
                    repositoryTopics.nodes.map(obj => obj.topic.name)
                )
        );
    }, [languages, repositoryTopics]);

    useEffect(() => {
            tagsSet(spreadStringsOverRowsByChars(initTags, maxRowChars));
    }, [initTags, maxRowChars]);

    useEffect(() => {
        if (window) {
            if (isLargeBrowser) {
            console.log('lirg')
                maxRowCharsSet(100);
            } else if (isMediumBrowser) {
                console.log('med')
                maxRowCharsSet(80);
            } else {
                console.log('sm')
                maxRowCharsSet('incremental-static-regeneration'.length);
            };
        }
    }, [isLargeBrowser, isMediumBrowser]);
    console.log('tags', tags.length)

    return (
        <div id={styles.project}>
            <section id={styles.mainSection}>
                <main>
                    <div className={styles.left}>
                        <div id={styles.topLeft}>
                            <div id={styles.header}>
                                <span className={styles.offsiteLinks}>
                                    {
                                        homepageUrl &&
                                        <span className={styles.conditionalContainer}>
                                            <a
                                                target='_blank' rel='noreferrer'
                                                href={homepageUrl}>
                                                deployment
                                            </a>
                                            <span className={styles.linkDivider}>
                                                |
                                            </span>
                                        </span>
                                    }
                                    <a
                                        target='_blank' rel='noreferrer'
                                        href={homepageUrl || githubUrl}>
                                        github
                                    </a>
                                </span>
                                <h2 id={styles.title}>{name}</h2>
                            </div>
                            <div id={styles.push}>
                                <h4>last push: </h4>
                                <span>{lastPushAt.match(/[\d]{4}-[\d]{2}-[\d]{2}/)}</span>
                            </div>
                        </div>
                        <p>{description}</p>

                    </div>
                    <div className={styles.right}>
                        <div className={styles.imageCard}>
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
                </main>
            </section>
            <section id={styles.tagsSection}>
                <ul>
                    {

                        tags.map((row, i) => (
                            <ul className={styles.tagsRow} key={i}> {
                                row.map((tag, j) => (
                                    <li className={styles.tag} key={i + j}>
                                        {tag}
                                    </li>
                                ))
                            }
                            </ul>
                        ))
                    }
                </ul>
            </section>
        </div >
    )
}

