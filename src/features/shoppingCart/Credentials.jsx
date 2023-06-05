import { useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import Map from "../../common/Map";
import { globalVars } from "../../app/globalVars";

export const Credentials = ({ credential, callbacks, props }) => {
  // check map is loading
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: globalVars.GOOGLE_MAPS_APIKEY,
    libraries: ["places"],
  });

  const [isTilesLoaded, setIsTilesLoaded] = useState(false);
  const [markerSelected, setMarkerSelected] = useState(false);

  const { positioning } = props;
  const { setPositioning, handleCredentials } = callbacks;

  const findCoords = async (e) => {
    if (!e.target.value) return;
    try {
      const geocoder = new google.maps.Geocoder();
      const request = geocoder.geocode({ address: e.target.value });
      const { results } = await request;
      // fill address input with new value
      handleCredentials({
        target: { name: "address", value: results[0].formatted_address },
      });
      // center map and set marker
      const coords = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      };
      setMarkerSelected(coords);
      setPositioning({ center: coords, zoom: 15 });
    } catch (error) {
      console.error(
        "delivery-app: incorrect address in the address field, try another. see error object below"
      );
      console.log(error);
    }
  };

  return (
    <section className="cart-credentials">
      <div className="cart-map">
        <Map
          props={{ isLoaded, positioning, isTilesLoaded, markerSelected }}
          callbacks={{
            setIsTilesLoaded,
            setPositioning,
            setMarkerSelected,
            handleCredentials,
          }}
        />
      </div>
      <label>
        Address:
        <input
          value={credential.address}
          type="text"
          name="address"
          onChange={handleCredentials}
          onBlur={findCoords}
        />
      </label>
      <label>
        Name:
        <input
          value={credential.name}
          type="text"
          name="name"
          onChange={handleCredentials}
        />
      </label>
      <label>
        Email:
        <input
          value={credential.email}
          type="email"
          name="email"
          onChange={handleCredentials}
        />
      </label>
      <label>
        Phone:
        <input
          value={credential.phone}
          type="tel"
          name="phone"
          onChange={handleCredentials}
        />
      </label>
    </section>
  );
};
