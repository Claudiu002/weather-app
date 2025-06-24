export const getCoords = () => new Promise((resolve, reject)=> {
    const fallbackToIp = async () => {
        try{
            const response = await fetch("https://ipapi.co/json/");
            const data = response.json();

            resolve({
                latitude: data.latitude,
                longitude: data.longitude,
                source: "ip",
                accuracy: "city",
            });
        } catch(error){
            reject(new Error("Nu am putut determina locatia"));
        }
    }

    if(!navigator.geolocation)
        return fallbackToIp();
    navigator.geolocation.getCurrentPosition((position)=> {
        const {latitude, longitude} = position.coords;
        resolve({
            latitude,
            longitude,
            source: 'gps',
            accuarcy: 'precise'
        })
    },
(error)=>{
    if(error.PERMISSION_DENIED)
        throw new Error("Permission Denied");
    else if(error.POSITION_UNAVAILABLE)
        throw new Error("Position Unavailable");
    else if(error.TIMEOUT)
        throw new Error('Timeout');

    console.warn("Geolocation failed:", error.message)
    fallbackToIp();
},
{
    timeout: 5000,
    enableHighAccuracy: true,
    maximumAge: 1000 * 60 * 10
})
})
