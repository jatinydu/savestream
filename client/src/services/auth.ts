export const signup=async(para:{name:string,password:string,signup_url:string})=>{
    const data = await fetch(para.signup_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: para.name,
          password:para.password
        })
      })
      const res = await data.json();
      return res;
}