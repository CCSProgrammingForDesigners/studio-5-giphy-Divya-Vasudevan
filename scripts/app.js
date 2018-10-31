const apiKey = "HSqqxx8q7xd94JmOrjVX4B076HRAUc4u";
const baseUrl = "http://api.giphy.com";

const hashTags = document.getElementsByClassName("hashTags");

const setLargeImg = (imgUrl) => {
    const imgContainer = document.getElementsByClassName("large-img")[0];
    const imgTag = `<img src="${imgUrl}" alt="main gif">`;
    imgContainer.insertAdjacentHTML("beforeend", imgTag);
}

const setSmallImgs = (images) => {
    const responses = document.getElementsByClassName("responses")[0];
    //to remove current li elements: used for when you click on hashtags or search to replace small images
    responses.innerHTML = "";
    for (const image of images) {
        const imgTag = `<li><img src="${image.images.fixed_width.url}" alt="main gif"></li>`;
        responses.insertAdjacentHTML("beforeend", imgTag);
    }
}

//for big image
fetch(`${baseUrl}/v1/gifs/random?api_key=${apiKey}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        setLargeImg(data.data.images.original.url);
    });

//for small images - initial (trending)
fetch(`${baseUrl}/v1/gifs/trending?api_key=${apiKey}&limit=9`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        setSmallImgs(data.data);
    });

//for setting event listeners to hashtags and reset small images
for (const hashTag of hashTags) {
    hashTag.addEventListener('click', e => {
        e.preventDefault();
        const search = e.target.dataset.tag;
        fetch(`${baseUrl}/v1/gifs/search?q="${search}"&api_key=${apiKey}&limit=9`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setSmallImgs(data.data);
            });
    });
}

//hookup search box using onchange event listener to get new data as you type rather than on clicking search
const input = document.getElementById("searchBox");
searchBox.addEventListener('change', e => {
    //e.preventDefault();
    fetch(`${baseUrl}/v1/gifs/search?q="${input.value}"&api_key=${apiKey}&limit=9`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setSmallImgs(data.data);
        });
});