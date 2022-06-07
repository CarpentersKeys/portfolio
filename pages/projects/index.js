import Image from 'next/image';
import { githubReposQuery as query } from '../../lib/queryStrings';
import graphqlFetch from '../../lib/graphqlFetch';
import styles from './index.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

    const [tagsDisplay, tagsDisplaySet] = useState(null);
    const [charLength, charLengthSet] = useState(18);

    // context pls
    const isLargeBrowser = useMediaQuery('(min-width: 1240px)');
    const isMediumBrowser = useMediaQuery('(min-width: 768px)');

    return {
        props: { repos, },
        revalidate: 60 * 30,
    };
};

    useEffect(() => {
        charLengthSet(
            isLargeBrowser && 28
            || isMediumBrowser && 14
            || 12
        )
    }, [isLargeBrowser, isMediumBrowser])

    // initial and interval setting of the tagsDisplay for project cards
    useEffect(() => {
        if (!tagsDisplay) { tagsDisplaySet(newTagsMap(repos), charLength); };

        const topicsTimer = setTimeout(() => {
            tagsDisplaySet(() => newTagsMap(repos, charLength))
        }, 300);

        return () => { clearTimeout(topicsTimer); };
    }, [repos, tagsDisplay]);

    return (
        <div id={styles.projects}>
            <section id={styles.mainSection}>
                <main>
                    <ul className={styles.mainUl}>
                        {
                            repos && repos.map((repo, i) => {
                                const { name, homepageUrl, githubUrl, imageUrl, description, lastPushAt, topics } = repo;

                                return (
                                    <li className={styles.projectLi} key={i + 'i'}>
                                        {/* <Link href={`/projects/${name}`} > */}
                                        <div className={styles.projectCard} >
                                            <div className={styles.top}>
                                                <div className={styles.imageCard}>
                                                    {/* probably what I need here  */}
                                                    image && <Image
                                                        alt='repository image'
                                                        className={styles.image}
                                                        // maybe format images to be wide bannerlike things with a couple items on them
                                                        src={imageUrl}
                                                        layout='fill'
                                                        priority
                                                        objectFit="cover"
                                                        objectPosition='center'
                                                    />
                                                </div>
                                            </div>
                                            {/* style text top left */}
                                            <div className={styles.bottom}>
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
                                                            tagsDisplay?.[i] && tagsDisplay[i].map((e, k) => <li key={k + 'ijk'}>{e + ' '}</li>)
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </Link> */}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </main>
            </section>
        </div >
    );
};

Projects.propTypes = {
    repos: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            homepageUrl: PropTypes.string,
            githubUrl: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired, // this defaults to profile image so if it's missing there's a problem
            description: PropTypes.string,
            lastPushAt: PropTypes.string,
            topics: PropTypes.array,
        })
    ),
};

const newTagsMap = (arr, charLength) => (
    // maps over an array of objects
    // returns array of string arrays(tags)
    arr.map(repo => (
        repo?.tags
            .slice()
            .sort(() => Math.random() - .5)
            .reduce((acc, tag) => {
                const newAcc = [...acc, tag];
                if (newAcc.join('').length < charLength) { return newAcc; };
                return acc;
            }, [])
    ))
);

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
            repositoryTopics,
            description,
        } = repo;
        const tags = languages.nodes.map(lang => lang.name)
            .concat(
                repositoryTopics.nodes
                    .map(obj => obj.topic.name)
                    .filter(e => e !== 'portfolio')
            );
        // const description = repo.description?.slice(0, 30).concat('..');
        return { name, homepageUrl, githubUrl, imageUrl, description, lastPushAt, tags };
    });

    return {
        props: { repos, },
        revalidate: 60 * 30,
    };
};