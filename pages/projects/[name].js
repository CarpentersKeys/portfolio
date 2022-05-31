import graphqlFetch from "../../lib/graphqlFetch";
import { githubReposQuery as query } from "../../lib/queryStrings";
import styles from '../../styles/Project.module.scss';

export default function Project(props, ...rest) {
    const languages = props.languages.nodes.map(lang => lang.name)
    const topics = props.repositoryTopics.nodes.map(obj => obj.topic.name)
    const {
        name,
        openGraphImageUrl: imageUrl,
        description,
        homepageUrl,
        pushedAt: lastPushAt,
        url: githubUrl,
    } = props;

    console.log(rest)
    return (
        <div>
            <h1 id={styles.title}>{name}</h1>
        </div>
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