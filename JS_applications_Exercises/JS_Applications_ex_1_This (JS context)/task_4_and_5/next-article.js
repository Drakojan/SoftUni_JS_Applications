function getArticleGenerator(articles) {
    
    let initialArr = articles;

    return function innerFunc(){

        let currentElement = initialArr.shift();

        if (currentElement === undefined) {
            return;
        }

        let currentPtoAdd= document.createElement('article');
        currentPtoAdd.textContent=currentElement;
        document.getElementById('content').appendChild(currentPtoAdd)

    }
}
