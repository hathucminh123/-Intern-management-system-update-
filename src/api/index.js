export const getTodos = () => {
    return fetch('https://dummyjson.com/todos')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      });
  };


  export const getIntern = async () => {
    // return fetch('https://dummyjson.com/users')
    //   .then(res => {
    //     if (!res.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return res.json();
    //   });
    const res = await fetch('https://dummyjson.com/users')
    return res.json();
  };

  export const getComment =()=>{
    return fetch('https://dummyjson.com/comments')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    });
  }