export default function (d) {

    return { ...d.data(), id: d.id }
}// Firebase returns a complicated object with many unneeded properties 
// this function parses the response from firebase to the normal object we want to use