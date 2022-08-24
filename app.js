console.log("Let's get this party started!");
const rating = 'g'
const api_key = 'gE3AZVm44jopff9IQ11JKrzkViOwYsZq'
const resultsDiv = $('#results');

$('form').on('submit', getGIF);
$('#reset').on('click', resetGIF);

function getOffset() { return Math.floor(Math.random() * 51); }

async function getGIF(e) {
    e.preventDefault();
    try {
        //q is the val from the input. if input is empty...do nothing
        const q = $('#searchTerm').val();
        if (!q) { return }
        const offset = getOffset();
        const res = await axios.get('http://api.giphy.com/v1/gifs/search', { params: { api_key, q, offset, rating } });
        const { url } = res.data.data[0].images.fixed_height;
        postGIF(url);
    }
    catch (e) {
        console.dir(e.message);
    }
}
function postGIF(url) {
    //mixing normal DOM element with jQuery
    //
    const image = document.createElement('img');
    image.src = url;
    resultsDiv.append(image);
}

function resetGIF() {
    resultsDiv.empty();
}