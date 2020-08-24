import firebaseRequests from "../firebaseRequests/index.js";
import extend from "../utilities/context.js";

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

        }
    },
    post: {
        login(context) {
            const { username, password } = context.params

            firebaseRequests.user.login(username, password)
                .then((response) => {
                    context.redirect('#/home')
                })
                .catch((e) => alert(e))
        },
        register(context) {

            const { username, password, rePassword } = context.params;


            if (password === rePassword) {

                firebaseRequests.user.register(username, password)
                    .then((response) => {
                        context.redirect('#/home')
                    })
                    .catch((err) => {
                        alert(err);
                    })
            }
            else { alert('password and re-Password do not match. Please try again') }
        },

    }
};