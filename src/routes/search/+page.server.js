/** @type {import('./$types').PageServerLoad} */
import {SECRET_API_KEY} from "$env/static/private"

export const load=async(event)=>{
const api_key=SECRET_API_KEY;
const city=event.url.searchParams.get("city");
if(!city){
    return{
        error:"Please input a city"
    }
}
const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
try {
    const response=await fetch(url);
    if (response.ok) {
        const weatherData = await response.json();
        console.log(weatherData)
        return { weatherData, error: "" };
    } else if (response.status === 404) {
        return {
            error: `The location '${city}' could not be found`,
        };
    } else {
        return { error: "Internal server error" };
    }

}catch(error){
    console.log(error)
    return{error:"internal server error"} 
}
}
   
