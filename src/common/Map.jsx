import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { addressOnMapSelected } from "../features/shoppingCart/cartSlice";

const containerStyle = {
  width: "100%",
  height: "20em",
};

function Map({ props, callbacks }) {
  const dispatch = useDispatch();
  const { setIsTilesLoaded, setPositioning, setSelected } = callbacks;
  const { isLoaded, selected, positioning, isTilesLoaded } = props;

  const clickHandler = async (e) => {
    const geocoder = new google.maps.Geocoder();
    const request = geocoder.geocode({ location: e.latLng });
    const { results } = await request;
    const address = results[0].formatted_address;
    // fill address combobox with new address string
    dispatch(addressOnMapSelected(address));
    // adding marker and centering
    const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setSelected(coords);
    setPositioning({ center: coords });
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={positioning.center}
        zoom={positioning.zoom}
        onTilesLoaded={() => setIsTilesLoaded(true)}
        onClick={clickHandler}
      >
        {selected && <Marker position={selected} />}
        {isTilesLoaded && <CompanyMarkers />}
      </GoogleMap>
    </>
  ) : (
    <div>loading...</div>
  );
}

const CompanyMarkers = () => {
  const companies = useSelector((store) => store.shop.companies);
  const selectedCompany = useSelector((store) => store.shop.selectedCompany);

  const companiesList = selectedCompany
    ? companies.filter((company) => company.companyName == selectedCompany)
    : companies;

  const markers = companiesList.map(({ companyName, companyAddress }) => {
    return companyAddress ? (
      <Marker
        // in case you want to style label
        // label={{ text: companyName, className: "map-company-marker" }}
        position={companyAddress}
        title={companyName}
        icon={"map-marker.png"}
        key={companyAddress.lat}
      />
    ) : null;
  });
  return <>{markers}</>;
};

export default React.memo(Map);
