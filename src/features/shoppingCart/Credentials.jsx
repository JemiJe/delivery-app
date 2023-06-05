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
