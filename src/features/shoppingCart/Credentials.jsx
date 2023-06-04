import { useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { addressOnMapSelected, clearSelectedAddress } from "./cartSlice";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
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

  const { selected, positioning } = props;
  const { setSelected, setPositioning, handleCredentials } = callbacks;

  return (
    <section className="cart-credentials">
      <div className="cart-map">
        <Map
          props={{ isLoaded, selected, positioning, isTilesLoaded }}
          callbacks={{ setIsTilesLoaded, setPositioning, setSelected }}
        />
      </div>
      <label>
        Address:
        {isLoaded && (
          <PlacesAutocomplete
            props={{ isTilesLoaded, isLoaded }}
            callbacks={{
              setSelected,
              setPositioning,
              handleCredentials,
            }}
          />
        )}
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

const PlacesAutocomplete = ({ props, callbacks }) => {
  const dispatch = useDispatch();
  const store = useStore();
  const { isLoaded, isTilesLoaded } = props;
  const { setSelected, setPositioning, handleCredentials } = callbacks;

  let {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // value = addressSelectedOnMap ? addressSelectedOnMap : value;
  const addressSelectedOnMap = useSelector(
    (state) => state.shoppingCart.selectedAddressOnMap
  );
  if (addressSelectedOnMap != value) {
    setValue(addressSelectedOnMap, false);
  }

  const handleSelect = async (address) => {
    setValue(address, false);
    handleCredentials({
      target: { name: "address", value: address },
    });
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setPositioning({
      center: { lat, lng },
      zoom: 18,
    });
  };

  return isLoaded && isTilesLoaded ? (
    <>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            // clear selected andress from the map and unlock natural behavior
            dispatch(clearSelectedAddress());
            setValue(e.target.value);
            handleCredentials({
              target: { name: "address", value: e.target.value },
            });
          }}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  ) : (
    "map is loading..."
  );
};
