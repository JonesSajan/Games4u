let axios=require("axios")
let ServerURL="https://games-4-u.herokuapp.com"

const getData = async (url) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`);
    return await response.json();
  } catch (e) {
    return null;
  }
};

const postDataAndImage=async(url,formData,config)=>{
try{
   let response=await axios.post(`${ServerURL}/${url}`,formData,config);
  return response.data.result
}
catch(e){
  return null

}

}

const postData = async (url, body) => {
  try {
    const response = await fetch(`${ServerURL}/${url}`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (e) {
    return null;
  }
};


export {postDataAndImage,ServerURL,getData,postData}