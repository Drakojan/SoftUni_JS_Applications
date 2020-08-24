var db = firebase.firestore();

export default {

    create(data) {

        return db.collection('treks').add({
            ...data,
            trekCreator: localStorage.getItem('username'),
            likes: 0,
        })
        // Input data is context.params which is a Sammy object. Destructuring data to transform to normal JS object.
    },

    getAll() {

        return db.collection('treks').get();
    },

    get(id) {

        return db.collection('treks').doc(id).get()
    },

    delete(id) {
        return db.collection('treks').doc(id).delete()
    },

    update(id, newData) {

        return db.collection('treks').doc(id).update(newData)
    }


}