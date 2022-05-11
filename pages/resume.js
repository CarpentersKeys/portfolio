export async function getStaticProps() {

    const urlResp = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GITHUB_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
            query: `
            query {
  viewer {
     repositories(affiliations:OWNER isFork:false last: 2 privacy:PUBLIC) {
       nodes {
         name
        openGraphImageUrl
        description
       }
     }
   }
}
            `
        })

    });
    const repos = await urlResp.json();
    console.log(repos.data.viewer.repositories);

    return { props: {} }
}



export default function Resume() {

    return <div><p>awef</p></div>
}