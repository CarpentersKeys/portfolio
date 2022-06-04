export default function spreadStringsOverRowsByChars(stringsArr, maxCharsPerRow) {

    const numOfRows = Math.ceil(stringsArr.join('').length / maxCharsPerRow);
    const sortedArr = stringsArr.slice().sort((a, b) => b.length - a.length);

    let rows = [];
    for (let i = 0; i < numOfRows; i += 1) {
        rows.push([])
    }

    sortedArr.forEach((str, ind) => {
        rows[ind % numOfRows].push(str);
    })

    rows
        .sort(() => Math.random() - .5)
        .forEach(rowArr => {
            rowArr.sort(() => Math.random() - .5)
        })

    return rows;
}