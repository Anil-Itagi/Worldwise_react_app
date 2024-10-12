
import styles from './Map.module.css'
import {MapContainer,TileLayer,Marker,Popup, useMap, useMapEvents}  from 'react-leaflet'
import { useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useURLPosition } from '../hooks/useURLPosition';
function Map() {

    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { isLoading: isLoadingPosition,
    position: geolocationPosition, getPosition } = useGeolocation();
    const [mapLat,mapLng] = useURLPosition();

    useEffect(function () {
        if (mapLat && mapLng)
            setMapPosition([mapLat,mapLng])
    }, [mapLat, mapLng])
    
    useEffect(function () {
        if (geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition]);
    return (

        <div className={styles.mapContainer}>
            <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading...":"Use Your Position"}
            </Button>
     <MapContainer className={styles.map } center={mapPosition} zoom={6} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => 
             
                         
           
            <Marker position={[city.position.lat || 40 ,city.position.lng|| 0]} key={city.id}>
                        <Popup>
                    <span>{city.emoji}</span><span>{city.cityName}</span>
                  </Popup>
          </Marker>
        )}
                
                <ChangeCenter position={mapPosition || [40,0]} />
              <DetectClick/>
            </MapContainer>
          
       </div> 
    )
}

function ChangeCenter(Props) {
    const map = useMap()
    map.setView(Props.position)
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            //  console.log(e)
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
           
        }
   }) 
}

export default Map;