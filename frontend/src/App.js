
 
import React, { useEffect, useState } from 'react';  
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';  
import axios from 'axios';
import './App.css';  

const App = () => {  
  const [vehicleData, setVehicleData] = useState([]);  
  const [vehiclePosition, setVehiclePosition] = useState(null);  
  const [path, setPath] = useState([]);  
  const [currentIndex, setCurrentIndex] = useState(0);  

  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const response = await axios.get('http://localhost:5000/api/location');  
        setVehicleData(response.data);  
        setPath(response.data); // Set initial path data  
        if (response.data.length > 0) {  
          setVehiclePosition(response.data[0]); // Set initial position  
        }  
      } catch (error) {  
        console.error("Error fetching vehicle location:", error);  
      }  
    };  

    fetchData(); // Initial fetch  

    const interval = setInterval(() => {  
      setCurrentIndex(prevIndex => {  
        const newIndex = (prevIndex + 1) % vehicleData.length;  
        setVehiclePosition(vehicleData[newIndex]); // Update the vehicle position  
        return newIndex;  
      });  
    }, 5000); // Update every 5 seconds  

    return () => clearInterval(interval); // Cleanup interval  
  }, [vehicleData]);  

  const mapContainerStyle = {  
    height: '400px',  
    width: '800px',  
  };  

  const center = vehiclePosition   
    ? { lat: vehiclePosition.latitude, lng: vehiclePosition.longitude }   
    : { lat: 17.385044, lng: 78.486671 };  

  return (  
    <LoadScript googleMapsApiKey="AIzaSyAAWAXoCvfTgwb0NyALG_YY32yWhPm2mOU">  
      <GoogleMap  
        mapContainerStyle={mapContainerStyle}  
        center={center}  
        zoom={15}  
      >  
        {vehiclePosition && (  
          <>  
            <Marker  
              position={{ lat: vehiclePosition.latitude, lng: vehiclePosition.longitude }}  
              icon={{  
                url: '/vehicle.png', // Ensure to place your car icon in the public folder  
                scaledSize: new window.google.maps.Size(30, 30),  
              }}  
              title="Vehicle"  
            />  
            <Polyline  
              path={path.map(location => ({ lat: location.latitude, lng: location.longitude }))}  
              options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}  
            />  
          </>  
        )}  
      </GoogleMap>  
    </LoadScript>  
  );  
};  

export default App;