import { createFormEntity } from "./helper_functions.js";
import { fireBaseRequestFactory } from "./firebaseRequests.js";

async function applyCommon() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    }

    this.username=sessionStorage.getItem('username')
    this.loggedIn = !!sessionStorage.getItem('token')
    this.hasNoTeam = true;


}
async function homeViewHandler() {

    await applyCommon.call(this)

    this.partial('./templates/home/home.hbs')
}

async function aboutViewHandler(){

    await applyCommon.call(this)

    this.partial('./templates/about/about.hbs')
}

async function loginViewHandler(){

    await applyCommon.call(this)

    this.partials.loginForm = await this.load('./templates/login/loginForm.hbs')

    await this.partial('./templates/login/loginPage.hbs')

    let loginForm = document.getElementById('login')

    loginForm.addEventListener('submit', e=>{

        e.preventDefault();

        let form = createFormEntity(loginForm,["username","password"])
        let formValue = form.getValue();

        firebase.auth().signInWithEmailAndPassword(formValue.username, formValue.password)
        .then((response)=> {
            console.log(response);

            firebase.auth().currentUser.getIdToken().then( token =>{
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('username', response.user.email)
            });
            
            this.redirect(['#/home'])
        })
        .catch()
    })
}

async function registerViewHandler(){

    await applyCommon.call(this)

    this.partials.registerForm = await this.load('./templates/register/registerForm.hbs')

    await this.partial('./templates/register/registerPage.hbs').then()

    let registerForm = document.getElementById('register')

    registerForm.addEventListener('submit', (e)=>{

        e.preventDefault();
        
        let form = createFormEntity(registerForm,['username','password', 'repeatPassword'])

        let formValues = form.getValue();

        if (formValues.password !==formValues.repeatPassword) {
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(formValues.username, formValues.password)
        .then(response => {
            console.log(response)
            firebase.auth().currentUser.getIdToken().then( token =>{
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('username', response.user.email)
            });

            this.redirect(['#/home'])
        })
        .catch((r)=>alert(r.message))
    })

}

async function logoutHandler(){

    sessionStorage.clear();

    firebase.auth().signOut()

    this.redirect(['#/home'])

}

async function catalogHandler(){
    
    await applyCommon.call(this)

    let token = sessionStorage.getItem('token')

    this.teams = await fetch('https://books-7a8df.firebaseio.com/teams/.json'+'?auth='+token)
    .then(x=>x.json())
    .then(x=>{

        for (const key in x) {
            if (x.hasOwnProperty(key)) {
                const element = x[key];
                    element._id = key;
                }
            }

        return x
    })
    

    
    this.partials.team = await this.load('./templates/catalog/team.hbs')
    this.partial("./templates/catalog/teamCatalog.hbs")

}

async function catalogueDetailsHandler() {
    const firebaseTeams = fireBaseRequestFactory('https://books-7a8df.firebaseio.com/', 'teams', sessionStorage.getItem('token'));
    console.log(this.params.id);
    this.teamId = this.params.id.slice(1);
    console.log(this.teamId);

    await firebaseTeams.getById(this.teamId).then(x=>
        {
            this.name = x.name
            this.comment = x.comment
            this.members = (x.teamMembers || []).map(member => ({ username: member.name }));
            this.isAuthor = (x.createdBy === sessionStorage.getItem('username'));
            this.isOnTeam = (x.teamMembers || []).find(x => x.name === sessionStorage.getItem('username'));
        })

    /**
     * Load hbs templates
     */
    await applyCommon.call(this);
    this.partials.teamMember = await this.load('./templates/catalog/teamMember.hbs');
    this.partials.teamControls = await this.load('./templates/catalog/teamControls.hbs');
    this.partial('./templates/catalog/details.hbs');
}

async function joinTeamHandler(){

    const firebaseTeams = await fireBaseRequestFactory('https://books-7a8df.firebaseio.com/', 'teams', sessionStorage.getItem('token'));
    this.teamId = this.params.id.slice(1)
    let teamObj = await firebaseTeams.getById(this.teamId);

    await firebaseTeams.patchEntity(
        {
            teamMembers: [...(teamObj.teamMembers || []),
        {name: sessionStorage.getItem("username")}
        
        ]

        },
        this.teamId
    )

    await this.redirect(`#/catalog/${this.params.id}`);

}

async function leaveTeamHandler(){
    
    const firebaseTeams = fireBaseRequestFactory('https://books-7a8df.firebaseio.com/', 'teams', sessionStorage.getItem('token'));
    console.log(this.params.teamId.slice(1));
    let team = await firebaseTeams.getById(this.params.teamId.slice(1));

    await firebaseTeams.patchEntity(
        {
            teamMembers: [
                ...(team.teamMembers || [])
                    .filter(teamMember => teamMember.name !== sessionStorage.getItem('username'))
            ]
        },
        this.params.teamId.slice(1)
    );

    await this.redirect(`#/catalog/${this.params.teamId}`);
}



async function createTeamHandler(){

    await applyCommon.call(this)

    this.partials.createForm = await this.load('./templates/create/createForm.hbs')

    await this.partial('./templates/create/createPage.hbs')

    let createForm = document.getElementById('createForm');

    let createButton = createForm.getElementsByClassName('btn btn-default')[0];

    createButton.addEventListener('click', (e)=>{

        e.preventDefault()

        let form = createFormEntity(createForm, ['name',"comment"]);
        let newTeamInfo = form.getValue();
        newTeamInfo.createdBy = sessionStorage.getItem("username")
        newTeamInfo.teamMembers = [{ name: sessionStorage.getItem("username")}];

        let token = sessionStorage.getItem('token');

        let teams = fireBaseRequestFactory('https://books-7a8df.firebaseio.com/','teams',token);
        teams.createEntity(newTeamInfo)
        form.clear()

        this.redirect(['#/home'])
    })

}
// initialize the application
var app = Sammy('#main', function() {
    // include a plugin
    this.use('Handlebars', 'hbs');
  
    // define a 'route'
    this.get('#/', homeViewHandler);
    this.get('#/home', homeViewHandler);
    this.get('#/about', aboutViewHandler);
    this.get('#/login', loginViewHandler);
    this.get('#/register', registerViewHandler);
    this.get('#/logout', logoutHandler)
    this.get('#/catalog', catalogHandler)
    this.get('#/create', createTeamHandler)
    this.get('#/catalog/:id', catalogueDetailsHandler);

    this.post('#/register',()=> false)
    this.post('#/login',()=> false)
    this.post('#/create',()=> false)

    // this.get('#/edit/:id', editTeamHandler);
    // this.post('#/edit/:id', () => false);
    this.get('#/join/:id', joinTeamHandler);
    this.get('#/leave:teamId', leaveTeamHandler);
    // this.get('#/create', createTeamHandler);
    this.post('#/create', () => false);

});
  
  // start the application

  (() => {
    app.run('#/'); 
  })();
