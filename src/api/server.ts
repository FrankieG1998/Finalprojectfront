let token = "196e1d0a5341fce18ebdd73f592772e3e85d91f1a2dd2582"
import axios from "axios";

export const options = {
      method: 'GET',
      url: 'https://f1-drivers-quotes.p.rapidapi.com/quotes',
      headers: {
        'X-RapidAPI-Key': '381890a8e7msha5241150939a6e4p175032jsn8da9e5a84293',
        'X-RapidAPI-Host': 'f1-drivers-quotes.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
