import controllers from "../controllers/index.js";

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', controllers.home.get.home);

    // User
    this.get('#/user/login', controllers.user.get.login);
    this.get('#/user/register', controllers.user.get.register);
    this.get('#/user/logout', controllers.user.get.logout);

    this.post(`#/user/login`, controllers.user.post.login);
    this.post(`#/user/register`, controllers.user.post.register);

    // Idea
    this.get("#/idea/create", controllers.idea.get.create);
    this.get('#/idea/dashboard', controllers.idea.get.dashboard);
    
    this.get("#/idea/details/:ideaId", controllers.idea.get.details);
    this.get("#/idea/delete/:ideaId", controllers.idea.delete.delete)


    this.post("#/idea/create", controllers.idea.post.create);
    this.post("#/idea/comment/:ideaId", controllers.idea.put.comment)
    this.get("#/idea/like/:ideaId", controllers.idea.put.like)

});

(() => {
    app.run('#/home')
})();