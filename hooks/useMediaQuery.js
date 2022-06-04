import { useState, useEffect } from "react";

export default function useMediaQuery(query) {
    const [matches, matchesSet] = useState(false);
    useEffect(() => {
        if (window) {
            const mql = window.matchMedia(query);
            // initial set
            if (matches !== mql.matches) { matchesSet(mql.matches); };
            // listen for changes and set
            const onMatch = () => {
                matchesSet(mql.matches);
            }
            mql.addEventListener('change', onMatch);
            return () => { mql.removeEventListener('change', onMatch); };
        };
    }, [query, matches]);
    return matches;
};