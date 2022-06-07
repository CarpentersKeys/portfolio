export const githubReposQuery = `#graphql
            query {
                    viewer {
                        repositories(affiliations:OWNER isFork:false last: 100 privacy:PUBLIC) { 
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