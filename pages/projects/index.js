import Image from 'next/image';
import { githubReposQuery as query } from '../../lib/queryStrings';
import graphqlFetch from '../../lib/graphqlFetch';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function Projects({ repos }) {
    const [tagsDisplay, tagsDisplaySet] = useState(null);
    const [offsiteLinkClicked, offsiteLinkClickedSet] = useState(false);
    const [mouseShortClick, mouseShortClickSet] = useState(false);
    const [charLength, charLengthSet] = useState(18);
    const router = useRouter();

    // context pls
    const isLargeBrowser = useMediaQuery('(min-width: 1240px)');
    const isMediumBrowser = useMediaQuery('(min-width: 768px)');

    useEffect(() => { console.log(charLength) }, [charLength])

    useEffect(() => {
        charLengthSet(
            isLargeBrowser && 28
            || isMediumBrowser && 14
            || 12
        )
    }, [isLargeBrowser, isMediumBrowser])

    // initial and interval setting of the tagsDisplay for project cards
    useEffect(() => {
        if (!tagsDisplay) { tagsDisplaySet(newTagsMap(repos, charLength)); };

        const tagsTimer = setTimeout(() => {
            tagsDisplaySet(() => newTagsMap(repos, charLength))
        }, 2000);

        return () => { clearTimeout(tagsTimer); };
    }, [repos, tagsDisplay, charLength]);

    // 'release' mouseShortClick to avoid linking from cards on highlight clicks
    // reset the offsiteLinkClicked as well
    useEffect(() => {
        let mouseTimer;

        if (mouseShortClick) {
            mouseTimer = setTimeout(() => {
                mouseShortClickSet(false);
                offsiteLinkClickedSet(false);
            }, 200);
        };

        return () => { clearTimeout(mouseTimer); };
    }, [mouseShortClick]);

    // only link to project is mouse has been down in the last 200ms
    // and if no links on the card were clicked
    function cardClickHandler(onMouseUpEvent, projectName) {
        onMouseUpEvent.preventDefault();

        if (mouseShortClick && !offsiteLinkClicked) {
            router.push(`/projects/${projectName}`);
        };

        return () => clearTimeout(clickTimer);
    }

    return (
        <div id={styles.projects}>
            <section id={styles.mainSection}>
                <main>
                    <ul className={styles.mainUl}>
                        {
                            repos && repos.map((repo, i) => {
                                const { name, homepageUrl, githubUrl, imageUrl, description, lastPushAt } = repo;

                                return (
                                    <li
                                        onMouseDown={() => { mouseShortClickSet(true); }}
                                        onMouseUp={(e) => { cardClickHandler(e, name) }}
                                        className={styles.projectLi}
                                        key={i + 'i'}>
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
                                                    <span onClick={() => offsiteLinkClickedSet(true)} className={styles.offsiteLinks}>
                                                        <h4>status</h4>
                                                        <span className={styles.linkDivider}>|</span>
                                                        <a
                                                            onMouseDown={() => { offsiteLinkClickedSet(true); }}
                                                            target='_blank' rel='noreferrer'
                                                            href={homepageUrl || githubUrl}>
                                                            {homepageUrl ? 'production' : 'development'}
                                                        </a>
                                                    </span>
                                                    <h3 id={styles.title}>{name}</h3>
                                                    <p className={styles.description}>{description}</p>
                                                </div>
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
            tags: PropTypes.array,
        })
    ),
};

const newTagsMap = (repos, charLength) => (
    // maps over an array of objects
    // returns array of string arrays(tags)
    repos.map(repo => (
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
    const repos = unformatted
        .sort((a, b) => (Date.parse(b.pushedAt) - Date.parse(a.pushedAt)))
        .map(repo => {
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

            return { name, homepageUrl, githubUrl, imageUrl, description, lastPushAt, tags };
        });

    return {
        props: { repos, },
        revalidate: 60 * 30,
    };
};