var db = firebase.firestore();

export default {

    create(data) {

        return db.collection('ideas').add({
            ...data,
            ideaCreator: localStorage.getItem('username'),
            comments: [],
            likes: 0,
        })
        // Input data is context.params which is a Sammy object. Destructuring data to transform to normal JS object.
    },

    getAll() {

        return db.collection('ideas').get();
    },

    get(id) {

        return db.collection('ideas').doc(id).get()
    },

    delete(id) {
        return db.collection('ideas').doc(id).delete()
    },

    update(id, newData) {

        return db.collection('ideas').doc(id).update(newData)
    }


}