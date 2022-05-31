import graphqlFetch from "../../lib/graphqlFetch";
import { githubReposQuery as query } from "../../lib/queryStrings";
import styles from '../../styles/Project.module.scss';
import Image from 'next/image';

export default function Project(props, ...rest) {
    const languages = props.languages.nodes.map(lang => lang.name)
    const topics = props.repositoryTopics.nodes.map(obj => obj.topic.name)
    const {
        name,
        homepageUrl,
        url: githubUrl,
        openGraphImageUrl: imageUrl,
        description,
        pushedAt: lastPushAt,
    } = props;

    return (
        <div>
            <section className={styles.project}>
                <span>
                    <h2 id={styles.title}>{name}</h2>
                    {
                        homepageUrl &&
                        <span className={styles.divider}>
                            <a
                                target='_blank' rel='noreferrer'
                                href={homepageUrl}>
                                Deployment
                            </a>
                            |
                        </span>
                    }
                    <a
                        target='_blank' rel='noreferrer'
                        href={homepageUrl || githubUrl}>
                        Github
                    </a>
                </span>
                <Image
                    alt='repository image'
                    className={styles.image}
                    // maybe format images to be wide bannerlike things with a couple items on them
                    src={imageUrl} width='300px' height='300px'
                />
                <h4>Last push:</h4>
                <span>{lastPushAt.match(/[\d]{4}-[\d]{2}-[\d]{2}/)}</span>
                <p>{description}</p>
                <ul className={styles.tagsCont}>
                    {
                        languages.concat(topics)
                            .map((tag, ind) => (
                                <li className={styles.tag} key={ind}>
                                    {tag}
                                </li>
                            ))
                    }
                </ul>
            </section>
        </div >
    )
}


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

export async function getStaticProps({ params: { name } }) {
    const repos = await graphqlFetch({ query });
    // fix this aweful query
    const props = repos.data.viewer.repositories.nodes.filter(repo => repo.name === name)[0];

    return {
        props,
        revalidate: 10,
    }
}