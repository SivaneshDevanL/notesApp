import React from 'react';
//const citieslist=[{city:"Goa",location:"India"},{city:"Amsterdam",location:"Netherlands"},{city:"New York",location:"USA"},{city:"Darjeeling",location:"India"}, {city:"Tokyo",location:"Japan"},{city:"Lonavala",location:"India"}]
const citieslist=["Goa(India)", "Amsterdam(Netherlands)","New York(USA)", "Darjeeling(India)", "Tokyo(Japan)","Lonavala(India)"]
function Sum() {
  var v=1;
  return(
    <ol>
    {citieslist.map((cityy)=>
    (Listv(cityy)!==''&&
    <li key={`location${v++}`}>{cityy}</li>
    )
    )}
    </ol>
  )
}
function Listv(city){
  if(city.includes("India")) return city
  return ''
}

export default Sum;
