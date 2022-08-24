console.log("Let's get this party started!");
const rating = 'g'
const api_key = 'gE3AZVm44jopff9IQ11JKrzkViOwYsZq'
const resultsDiv = document.querySelector('#results');

$('form').on('submit', getGIF);
$('#reset').on('click', resetGIF);

function getOffset() { return Math.floor(Math.random() * 51); }

async function getGIF(e) {
    e.preventDefault();
    try {
        const q = $('#searchTerm').val();
        if (!q) { return }
        const offset = getOffset();
        const res = await axios.get('http://api.giphy.com/v1/gifs/search', { params: { api_key, q, offset, rating } });
        const imgURL = res.data.data[0].images.fixed_height.url;
        postImg(imgURL);
    }
    catch (e) {
        console.dir(e.message);
    }
}
function postImg(url) {
    const image = document.createElement('img');
    image.src = url;
    resultsDiv.append(image);
}

function resetGIF() {
    const children = resultsDiv.children;
    for (let img of children) {
        img.remove();
    }
}