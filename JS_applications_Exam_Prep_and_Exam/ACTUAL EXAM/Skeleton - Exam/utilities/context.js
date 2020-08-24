// the extend() function checks if the user is logged in... 
// and populates the header and footer accordingly. It's called everytime we need to show a new view. 
export default function extend(context) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.

            context.isLoggedIn = true;
            context.username = user.email
            context.userId = user.uid;
            localStorage.setItem('userId', user.uid)
            localStorage.setItem('username', user.email)

        } else {
            // User is signed out.

            context.isLoggedIn = false;
            context.username = null;
            context.userId = null;
            localStorage.clear()
        }
    });

    return context.loadPartials({
        header: "../views/shared/header.hbs",
        footer: "../views/shared/footer.hbs"
    })

}