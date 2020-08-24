import extend from "../utilities/context.js";
import firebaseRequests from "../firebaseRequests/index.js";
import docParser from "../utilities/doc-parser.js";

export default {

    get: {

        dashboard: function (context) {
            firebaseRequests.idea.getAll()
                .then((response) => {

                    const ideas = response.docs.map(docParser);
                    ideas.sort((a,b)=> b.likes-a.likes)
                    context.ideas = ideas;

                    extend(context).then(function () {
                        this.partial('../views/idea/dashboard.hbs')
                    })
                })
        },

        create: function (context) {
            extend(context).then(function () {
                this.partial('../views/idea/create.hbs')
            })
        },

        details: function (context) {

            const { ideaId } = context.params;
            firebaseRequests.idea.get(ideaId)
                .then((response) => {
                    const idea = docParser(response)
                    context.idea = idea;

                    context.loggedInUesrIsCreator = (idea.ideaCreator === localStorage.getItem('username'))

                    extend(context).then(function () {

                        this.partial('../views/idea/details.hbs')
                    })
                })
                .catch((e) => console.error(e))
        },
    },

    post: {

        create: function (context) {
            firebaseRequests.idea.create(context.params)
                .then((response) => {
                    context.redirect("#/idea/dashboard")
                })
                .catch((e) => console.error(e))
        },
    },

    delete: {
        delete: function (context) {

            const { ideaId } = context.params;
            firebaseRequests.idea.delete(ideaId)
                .then((response) => context.redirect("#/idea/dashboard"))
        }
    },

    put: {
        comment: function (context) {

            const { ideaId, newComment } = context.params;

            firebaseRequests.idea.get(ideaId).then((response) => {
                const idea = docParser(response);
                idea.comments.push(`${localStorage.getItem('username')}: ${newComment}`);

                return firebaseRequests.idea.update(ideaId, idea)
            })
            .then(context.redirect("#/idea/dashboard"));
        },

        like: async function(context){

            const { ideaId } = context.params;

            await firebaseRequests.idea.get(ideaId).then((response) => {
                const idea = docParser(response);
                idea.likes++;

                return firebaseRequests.idea.update(ideaId, idea)
            })
            .then(context.redirect("#/idea/dashboard"))
            document.querySelector(".btn").click()
// not sure how to "refresh" the html of the page to show the likes++ so 
// I just simulate it by automatically going to dashboard and clicking details
// there's probably a better way to do it. 
        }
    }
};