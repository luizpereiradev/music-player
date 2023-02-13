
var cors_api_url = 'https://my-cors-proxy.herokuapp.com/';

const getMusics = async (id:number) => {
  const response  = await fetch(cors_api_url + `https://itunes.apple.com/lookup?id=${id}&entity=song`)
  const data = await response.json();
  return data.results;
};


export default getMusics;

