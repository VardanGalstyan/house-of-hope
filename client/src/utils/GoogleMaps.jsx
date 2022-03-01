import React from 'react'
import GoogleMapReact from 'google-map-react';


function GoogleMap({ location }) {

    const handleObject = () => {
        if (location) {
            return {
                lat: location[0],
                lng: location[1]
            }
        }

    }

    const renderMarkers = (map, maps) => {

        let marker = new maps.Marker({
            position: handleObject(),
            map,
            title: `${location && location}`
        });

        return marker;
    };

    return (
        <div className='details-google-map'>
            {
                location &&
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP }}
                    defaultCenter={handleObject()}
                    defaultZoom={14}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                >
                </GoogleMapReact>
            }
        </div >
    )
}

export default GoogleMap
