function CallApi({difficulty, category, questionCount}) {

    const count = `?amount=${questionCount}`
    const cat = (category === "any") ? "" : `&category=${category}`;
    const diff = (difficulty === "any") ? "" : `&difficulty=${difficulty}`;

    return fetch(`https://opentdb.com/api.php${count}${cat}${diff}`)
        .then(res=>res.json())
        .then(data=>data.results)
}

export default CallApi;