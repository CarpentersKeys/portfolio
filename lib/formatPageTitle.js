export default function formatPageTitle(pathString) {
    if (typeof (pathString) !== 'string') { return undefined; };

    return pathString.replaceAll('/', ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase().concat(word.slice(1)))
        .join(' ')
        .trim();
}