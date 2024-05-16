let sortedKeys = Object.keys(articles).sort((a, b) => new Date(articles[b]['publish-date']) - new Date(articles[a]['publish-date']));

let listofart = document.querySelector('.listofart');

let currentMonthYear = null;
sortedKeys.forEach(key => {
    let article = articles[key];
    let publishDate = new Date(article['publish-date']);
    let monthYear = publishDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    if (monthYear !== currentMonthYear) {
        let header = document.createElement('div');
        header.classList.add('monthyear');
        header.textContent = monthYear;
        listofart.appendChild(header);
        currentMonthYear = monthYear;
    }

    let articleElement = document.createElement('div');
    articleElement.classList.add('article-title');
    let titleElement = document.createElement('a'); // Change this line
    titleElement.classList.add('title');
    titleElement.href = `/articlespec/${key}`; // Add this line
    titleElement.textContent = `\u2022 ${article['title']}`;
    let fillerElement = document.createElement('span');
    fillerElement.classList.add('filler');
    fillerElement.textContent = '............................................................'; // Add as many dots as needed
    let authorElement = document.createElement('span');
    authorElement.textContent = `${article['author']}`;
    articleElement.appendChild(titleElement);
    articleElement.appendChild(fillerElement);
    articleElement.appendChild(authorElement);
    listofart.appendChild(articleElement);
});