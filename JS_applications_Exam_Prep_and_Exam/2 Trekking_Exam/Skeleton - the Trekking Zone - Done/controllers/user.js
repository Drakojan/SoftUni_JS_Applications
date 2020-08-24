import firebaseRequests from "../firebaseRequests/index.js";
import extend from "../utilities/context.js";
import docParser from "../utilities/doc-parser.js";

export default {
    get: {
        login(context) {
            extend(context)
                .then(function () {

                    this.partial('./views/user/login.hbs')
                })
        },
        register(context) {
            extend(context)
                .then(function () {

                    this.partial('./views/user/register.hbs')
                })
        },
        logout(context) {

            firebaseRequests.user.logout()
                .then((response) => {
                    context.redirect('#/home')
                })

        },
        profile(context){

            firebaseRequests.trek.getAll()
            .then((response) => {

                let treks = response.docs.map(docParser);
                
                treks = treks.filter((a) =>a.trekCreator === localStorage.getItem('username'))

                context.treks = treks;
                context.username= localStorage.getItem('username')

                extend(context).then(function () {
                    this.partial('../views/user/profile.hbs')
                })
            })

        }
    },
    post: {
        login(context) {
            const { username, password } = context.params

            firebaseRequests.user.login(username, password)
                .then((response) => {
                    context.redirect('#/trek/dashboard')
                })
                .catch((e) => alert(e))
        },
        register(context) {

            const { username, password, rePassword } = context.params;


            if (password === rePassword) {

                firebaseRequests.user.register(username, password)
                    .then((response) => {
                        context.redirect('#/trek/dashboard')
                    })
                    .catch((err) => {
                        alert(err);
                    })
            }
            else {alert('password and re-Password do not match. Please try again') } //TODO - add message. 
        },

    }
};