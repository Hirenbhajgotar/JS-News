/**
 * ! News Api key : b42599300dbe42f583f4a2207abc9033
 * https://newsapi.org/v2/sources?apiKey=b42599300dbe42f583f4a2207abc9033
 */

let apiKey = 'b42599300dbe42f583f4a2207abc9033';

// let source = document.getElementById('source');

// * get sources name  from URL
let url_string = window.location;
let url = new URL(url_string);
let name = 'entertainment-weekly';
// * Sources
name = url.searchParams.get("source");
// * Country
let countryName = url.searchParams.get("country");
// console.log(name);
// console.log(countryName);

let xhr = new XMLHttpRequest();
if (name != null) {
    // console.log('sources');
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${name}&apiKey=${apiKey}`);
}else if(countryName != null){
    // console.log('country');
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${countryName}&apiKey=${apiKey}`);
}else{
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=entertainment-weekly&apiKey=${apiKey}`);
}

xhr.onprogress = function () {
    // * Loader
    let loader = document.getElementById('loader');
    loader.innerHTML = `
        <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
        </div>
    `;
    // console.log('progress');
};

xhr.onload = function() {
	if (this.status === 200) {
        document.getElementById('loader').style.display = 'none';
		let articles = JSON.parse(this.responseText).articles;
		let newsHtml = '';
		articles.forEach(function(e) {
			// console.log(e);
			let news = `
                <div>
                    <article class="message is-primary">
                        <div class="message-body">
                            <a href="${e.url}" target="_blank" title="Read more" class="has-text-grey-darker is-size-4 has-text-weight-normal" style="text-decoration: none ">
                                ${e.title}
                            </a>
                        </div>
                    </article>
                    <p class="subtitle is-size-5"> - ${e.source.name}</p>
                    <p><strong>Description : </strong> ${e.description} </p>
                    <p class="has-text-justified is-capitalized mt-1">
                        <strong>Content : </strong> ${e.content}
                    </p>
                    <p class="has-text-grey-light is-size-7 is-family-monospace pt-2">${e.publishedAt.replace(/[^0-9 -:]/g, ' ')}</p>
                    <p>
                        <a href="${e.url}" target="_blank">Read more →</a></p>
                    <hr>
                </div>
            `;
			newsHtml += news;
		});
		newsContent.innerHTML = newsHtml;

		// console.log(j[0]);
	} else {
		console.log('error ocured');
	}
};
xhr.send();

// console.log(newsContent);
