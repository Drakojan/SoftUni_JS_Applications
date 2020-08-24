import extend from "../utilities/context.js";
import firebaseRequests from "../firebaseRequests/index.js";
import docParser from "../utilities/doc-parser.js";

export default {

    get: {

        dashboard: function (context) {
            firebaseRequests.trek.getAll()
                .then((response) => {

                    const treks = response.docs.map(docParser);
                    context.treks = treks;
                    
                    treks.sort((a,b)=> b.likes-a.likes)

                    extend(context).then(function () {
                        this.partial('../views/trek/dashboard.hbs')
                    })
                })
        },

        create: function (context) {
            extend(context).then(function () {
                this.partial('../views/trek/create.hbs')
            })
        },

        details: function (context) {

            const { trekId } = context.params;
            firebaseRequests.trek.get(trekId)
                .then((response) => {
                    const trek = docParser(response)
                    context.trek = trek;

                    context.loggedInUesrIsCreator = (trek.trekCreator === localStorage.getItem('username'))

                    extend(context).then(function () {

                        this.partial('../views/trek/details.hbs')
                    })
                })
                .catch((e) => console.error(e))
        },

        edit: function(context) {

            const { trekId } = context.params;
            firebaseRequests.trek.get(trekId)
                .then((response) => {
                    const trek = docParser(response)
                    context.trek = trek;

                    extend(context).then(function () {

                        this.partial('../views/trek/edit.hbs')
                    })
                })
                .catch((e) => console.error(e))
        }
    },

    post: {

        create: function (context) {
            firebaseRequests.trek.create(context.params)
                .then((response) => {
                    context.redirect("#/trek/dashboard")
                })
                .catch((e) => console.error(e))
        },
    },

    delete: {
        delete: function (context) {

            const { trekId } = context.params;
            firebaseRequests.trek.delete(trekId)
                .then((response) => context.redirect("#/trek/dashboard"))
        }
    },

    put: {

        edit: function (context) {

            const { trekId, dateTime, description, imageURL, location } = context.params;

            firebaseRequests.trek.get(trekId).then((response) => {
                const trek = docParser(response);

                trek.dateTime = dateTime;
                trek.description = description;
                trek.imageURL=imageURL;
                trek.location=location;

                return firebaseRequests.trek.update(trekId, trek)
                .then(context.redirect("#/trek/dashboard"))
            })
        },

        like: async function (context) {

            const { trekId } = context.params;

            await firebaseRequests.trek.get(trekId).then((response) => {
                const trek = docParser(response);
                trek.likes++;

                return firebaseRequests.trek.update(trekId, trek)
            })
            .then(context.redirect("#/trek/dashboard"))
            document.querySelector(`#${trekId}`).click()

        }
    }
};