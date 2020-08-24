import extend from "../utilities/context.js";
import firebaseRequests from "../firebaseRequests/index.js";
import docParser from "../utilities/doc-parser.js";

export default {

    get: {

        dashboard: function (context) {
            firebaseRequests.cause.getAll()
                .then((response) => {

                    const causes = response.docs.map(docParser);
                    context.causes = causes;

                    extend(context).then(function () {
                        this.partial('../views/cause/dashboard.hbs')
                    })
                })
        },

        create: function (context) {
            extend(context).then(function () {
                this.partial('../views/cause/create.hbs')
            })
        },

        details: function (context) {

            const { causeId } = context.params;
            firebaseRequests.cause.get(causeId)
                .then((response) => {
                    const cause = docParser(response)
                    context.cause = cause;

                    context.loggedInUesrIsCreator = (cause.causeCreator === localStorage.getItem('username'))

                    extend(context).then(function () {

                        this.partial('../views/cause/details.hbs')
                    })
                })
                .catch((e) => console.error(e))
        },
    },

    post: {

        create: function (context) {
            firebaseRequests.cause.create(context.params)
                .then((response) => {
                    context.redirect("#/cause/dashboard")
                })
                .catch((e) => console.error(e))
        },
    },

    delete: {
        delete: function (context) {

            const { causeId } = context.params;
            firebaseRequests.cause.delete(causeId)
                .then((response) => context.redirect("#/cause/dashboard"))
        }
    },

    put: {

        donate: function (context) {

            const { causeId, donatedAmount } = context.params;

            firebaseRequests.cause.get(causeId).then((response) => {
                const cause = docParser(response);
                cause.collectedFunds += Number(donatedAmount);

                if (!cause.donors.find((x) => (x === localStorage.getItem('username')))) {
                    cause.donors.push(localStorage.getItem('username'));
                }
                return firebaseRequests.cause.donate(causeId, cause)
            })
                .then(context.redirect("#/cause/dashboard"));
        }
    }
};