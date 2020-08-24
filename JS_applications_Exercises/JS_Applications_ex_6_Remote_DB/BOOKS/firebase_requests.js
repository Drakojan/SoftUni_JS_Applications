export const ApiKey = 'https://books-7a8df.firebaseio.com/' //add your firebase url here

export const getAllBooks = () =>{
    return fetch(ApiKey+'books.json')
            .then(x=>x.json());
};

export const createNewBook = (newBook) =>{
    return fetch(ApiKey+'books.json',{
        method: 'post',
        body: JSON.stringify(newBook)
    });
};

export const updateBook = (Book,   id)=>{
    return fetch(ApiKey+`books/${id}.json`,{
        method: 'PUT',
        body: JSON.stringify(Book)
    });
};

export const deleteBook = (id)=>{
    return fetch(ApiKey+`books/${id}.json`,{
        method: 'delete',
    });
};


