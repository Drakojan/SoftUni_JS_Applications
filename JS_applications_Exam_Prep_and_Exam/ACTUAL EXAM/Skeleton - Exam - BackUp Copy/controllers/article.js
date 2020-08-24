import extend from "../utilities/context.js";
import firebaseRequests from "../firebaseRequests/index.js";
import docParser from "../utilities/doc-parser.js";

export default {

    get: {

        dashboard: function (context) {
            firebaseRequests.article.getAll()
                .then((response) => {

                    const articles = response.docs.map(docParser);

                    context.JSarticles = articles.filter((x)=> x.category.toLowerCase() ==='javascript').sort((a,b)=> {return b.title.localeCompare(a.title)});
                    context.csharpArticles = articles.filter((x)=> x.category.toLowerCase() ==='c#').sort((a,b)=> {return b.title.localeCompare(a.title)});
                    context.javArticles = articles.filter((x)=> x.category.toLowerCase() ==='java').sort((a,b)=> {return b.title.localeCompare(a.title)});
                    context.pythonArticles = articles.filter((x)=> x.category.toLowerCase() ==='pyton').sort((a,b)=> {return b.title.localeCompare(a.title)});

                

                    extend(context).then(function () {
                        this.partial('../views/article/dashboard.hbs')
                    })
                })
        },

        create: function (context) {
            extend(context).then(function () {
                this.partial('../views/article/create.hbs')
            })
        },

        details: function (context) {

            const { articleId } = context.params;
            firebaseRequests.article.get(articleId)
                .then((response) => {
                    const article = docParser(response)
                    context.article = article;

                    context.loggedInUesrIsCreator = (article.creator === localStorage.getItem('username'))

                    extend(context).then(function () {

                        this.partial('../views/article/details.hbs')
                    })
                })
                .catch((e) => console.error(e))
        },
        edit: function(context) {

            const { articleId } = context.params;
            firebaseRequests.article.get(articleId)
                .then((response) => {
                    const article = docParser(response)
                    context.article = article;

                    extend(context).then(function () {

                        this.partial('../views/article/edit.hbs')
                    })
                })
                .catch((e) => console.error(e))
        }
    },

    post: {

        create: function (context) {
            
            let { category } = context.params
            category = category.toLowerCase();
            if (category!=='javascript' && category!=="c#" && category!=="pyton" && category!=="java") {
                window.alert('All articles have to be in one of the 4 categories: javascript, c#, pyton, java (not case sensitive). Note that pyton is spelled without an h')
                return;                
            }
            firebaseRequests.article.create(context.params)
                .then((response) => {
                    context.redirect("#/article/dashboard")
                })
                .catch((e) => console.error(e))
        },
    },

    delete: {
        delete: function (context) {

            const { articleId } = context.params;

            firebaseRequests.article.delete(articleId)
                .then((response) => context.redirect("#/article/dashboard"))
        }
    },

    put: {

        edit: function (context) {

            const { articleId, title, category, content } = context.params;

            firebaseRequests.article.get(articleId).then((response) => {
                const article = docParser(response);

                article.title = title;
                article.category = category;
                article.content=content;

                return firebaseRequests.article.update(articleId, article)
                .then(context.redirect("#/article/dashboard"))
            })
        },
    }
};