var db = firebase.firestore();

export default {

    create(data) {

        return db.collection('causes').add({
            ...data,
            causeCreator: localStorage.getItem('username'),
            donors: [],
            collectedFunds: 0,
        })
        // Input data is context.params which is a Sammy object. Destructuring data to transform to normal JS object.
    },

    getAll() {

        return db.collection('causes').get();
    },

    get(id) {

        return db.collection('causes').doc(id).get()
    },

    delete(id) {
        return db.collection('causes').doc(id).delete()
    },

    donate(id, newData) {

        return db.collection('causes').doc(id).update(newData)
    }


}