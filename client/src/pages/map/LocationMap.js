// LocationMap.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const LocationMap = ({ apiKey }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        center={location}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
      {/* <p>current location is: {location.lat}, {location.lng}</p> */}
    </LoadScript>
  );
};

export default LocationMap;
