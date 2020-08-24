var db = firebase.firestore();

export default {

    create(data) {

        return db.collection('articles').add({
            ...data,
            creator: localStorage.getItem('username'),
        })
        // Input data is context.params which is a Sammy object. Destructuring data to transform to normal JS object.
    },

    getAll() {

        return db.collection('articles').get();
    },

    get(id) {

        return db.collection('articles').doc(id).get()
    },

    delete(id) {
        return db.collection('articles').doc(id).delete()
    },

    update(id, newData) {

        return db.collection('articles').doc(id).update(newData)
    }


}