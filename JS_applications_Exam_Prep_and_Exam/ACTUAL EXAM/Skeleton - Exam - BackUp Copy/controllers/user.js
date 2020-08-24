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
                    context.redirect('#/user/login')
                })

        }
    },
    post: {
        login(context) {
            const { email, password } = context.params

            firebaseRequests.user.login(email, password)
                .then((response) => {
                    context.redirect('#/article/dashboard')
                })
                .catch((e) => alert(e))
        },
        register(context) {

            const rePassword = document.getElementById('rep-pass').value;
            const { email, password } = context.params;

            if (password === rePassword) {

                firebaseRequests.user.register(email, password)
                    .then((response) => {
                        context.redirect('#/article/dashboard')
                    })
                    .catch((err) => {
                        alert(err);
                    })
            }
            else { alert('password and re-Password do not match. Please try again') }
        },

    }
};