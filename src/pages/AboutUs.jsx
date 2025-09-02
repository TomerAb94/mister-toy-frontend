import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps'
import { useState } from 'react'

const API_KEY = 'AIzaSyDeq9fpHcYFKtiBLHFQQXqHJ9K1SbNKIIg'

export function AboutUs() {
  const shopCoords = [
    { lat: 32.08618, lng: 34.776299 },
    { lat: 32.185918, lng: 34.869273 },
    { lat: 31.96925, lng: 34.810432 },
  ]

  const [centerCoord, setCenter] = useState(shopCoords[0])

  function handleMarkerClick(coord) {
    setCenter(coord)
  }

  function handleCenterChanged(map) {
    if (map && map.getCenter) {
      const newCenter = map.getCenter();
      setCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      })
    }
  }

  return (
    <section className="about-us">
      <h2>About Us</h2>
      <section className="map-container">
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultZoom={10}
            mapId="DEMO_MAP_ID"
            center={centerCoord}
            gestureHandling={'greedy'} 
            onCenterChanged={({ map }) => handleCenterChanged(map)} 
          >
            {shopCoords.map((coord, idx) => (
              <AdvancedMarker
                key={idx}
                position={coord}
                onClick={() => handleMarkerClick(coord)}
              >
                <Pin />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </section>
    </section>
  )
}