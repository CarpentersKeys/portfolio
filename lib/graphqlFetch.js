export default async function graphqlFetch({ query, url, authToken }) {

    const urlResp = await fetch(

        url || process.env.DEFAULT_GRAPHQL_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken || process.env.DEFAULT_GRAPHQL_AUTH_TOKEN}`,
            },
            // change query from 'viewer'?
            // get better query formatting
            body: JSON.stringify({ query })
        }

    );

    return await urlResp.json();

}
