export const githubReposQuery = `#graphql
            query {
                    viewer {
                        repositories(affiliations:OWNER isFork:false last: 2 privacy:PUBLIC) { 
                            nodes {
                        name
                        openGraphImageUrl
                        description
                        homepageUrl
                        pushedAt
                languages(first: 100) {
                    nodes {
                    name
                    }
                }
                url
                repositoryTopics(first: 100) {
                    nodes {
                    topic {
                        name
            }
            }
        }
        }
            }
        }
        }`