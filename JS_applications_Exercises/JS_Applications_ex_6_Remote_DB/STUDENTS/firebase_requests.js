const ApiKey = 'https://books-7a8df.firebaseio.com/';

export const createNewStudent = (newStudent)=>{

    return fetch(ApiKey+'students.json',{
        method: 'post',
        body: JSON.stringify(newStudent)
    });
}

export const getAllStudents = () =>{
    return fetch(ApiKey+'students.json')
            .then(x=>x.json());
};