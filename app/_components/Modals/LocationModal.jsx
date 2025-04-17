"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import SubmitButton from "../Input/SubmitButton.jsx";
import LocationRow from "../Weather/LocationRow.jsx";
import { toast } from "react-toastify";
import { MdRestore } from "react-icons/md";

function LocationModal({
  isOpen,
  close,
  weatherInformation,
  setWeatherInformation,
  setSelected,
  selected,
}) {
  const [editableWI, setEditableWI] = useState(
    Object.keys(weatherInformation).map((key) => ({
      location: key,
      latitude: weatherInformation[key]["latitude"],
      longitude: weatherInformation[key]["longitude"],
    }))
  );
  const [newLocation, setNewLocation] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");

  const [selectedLocation, setSelectedLocation] = useState(selected);

  const validateInput = (location, latitude, longitude) => {
    if (
      !location ||
      !latitude ||
      !longitude ||
      isNaN(Number(latitude)) ||
      isNaN(Number(longitude))
    )
      return false;

    if (latitude < -90 || latitude > 90) return false;
    if (longitude < -180 || longitude > 180) return false;
    return true;
  };

  let handleSubmitAndClose = () => {
    let temp = {};
    for (let i = 0; i < editableWI.length; i++) {
      const element = editableWI[i];
      if (
        !validateInput(element.location, element.latitude, element.longitude)
      ) {
        toast.error("Please Provide Correct Values!");
        return;
      }
      // The old locations has this location
      if (weatherInformation.hasOwnProperty(element.location)) {
        // the coords didn't change, keep the cached data
        if (
          element.latitude === weatherInformation[element.location].latitude &&
          element.longitude === weatherInformation[element.location].longitude
        ) {
          temp[element.location] = {
            ...weatherInformation[element.location],
            latitude: element.latitude,
            longitude: element.longitude,
          };
        } else {
          // new coords so don't include the cached information
          temp[element.location] = {
            latitude: element.latitude,
            longitude: element.longitude,
          };
        }
      } else {
        temp[element.location] = {
          latitude: element.latitude,
          longitude: element.longitude,
        };
      }
    }
    setWeatherInformation(temp);
    setSelected(selectedLocation);

    close();
  };

  const handleUpdateValue = (index, key, value) => {
    let wi = [...editableWI];
    wi[index][key] = value;
    setEditableWI(wi);
  };

  const handleDeleteLocation = (index) => {
    if (editableWI[index].location === selected) setSelectedLocation("");
    setEditableWI((weatherInformation) => {
      return weatherInformation.filter((value, vIndex) => index !== vIndex);
    });
  };

  const handleAddLocation = () => {
    if (!validateInput(newLocation, newLatitude, newLongitude)) {
      toast.error("Please Provide Correct Values!");
      return;
    }
    setEditableWI((weatherInformation) => [
      ...weatherInformation,
      { location: newLocation, latitude: newLatitude, longitude: newLongitude },
    ]);
    setNewLocation("");
    setNewLatitude("");
    setNewLongitude("");
  };

  const revertChanges = () => {
    setEditableWI(
      Object.keys(weatherInformation).map((key) => ({
        location: key,
        latitude: weatherInformation[key]["latitude"],
        longitude: weatherInformation[key]["longitude"],
      }))
    );
    setSelectedLocation(selected);
  };

  useEffect(() => {
    revertChanges();
  }, [weatherInformation, isOpen]);

  return (
    <Modal
      key={"location-menu"}
      id={"location-menu"}
      isOpen={isOpen}
      close={() => {
        close();
      }}
      title={"Locations"}
      // onEnter={handleSubmitAndClose}
      className={"gap-4 relative"}
    >
      <div className="flex flex-col  items-center justify-between ">
        <div className="flex flex-col gap-2 h-[20rem] overflow-y-auto px-4 ">
          <LocationRow
            newLocation={true}
            onAdd={handleAddLocation}
            latitude={newLatitude}
            location={newLocation}
            longitude={newLongitude}
            onEditLatitude={setNewLatitude}
            onEditLocation={setNewLocation}
            onEditLongitude={setNewLongitude}
          />
          <div className="w-full h-[1px] bg-foreground/50"></div>
          {editableWI.map((wi, index, arr) => (
            <LocationRow
              key={index}
              location={wi.location}
              longitude={wi.longitude}
              latitude={wi.latitude}
              onEditLatitude={(value) =>
                handleUpdateValue(index, "latitude", value)
              }
              onEditLongitude={(value) =>
                handleUpdateValue(index, "longitude", value)
              }
              onEditLocation={(value) =>
                handleUpdateValue(index, "location", value)
              }
              onDelete={() => handleDeleteLocation(index)}
              selected={selectedLocation}
              onSelect={(selected) => setSelectedLocation(selected)}
            />
          ))}
        </div>
        <div className="flex gap-2 items-center mb-1">
          <SubmitButton title="Save Changes" onSubmit={handleSubmitAndClose} />
          <button
            onClick={revertChanges}
            className="p-1 hover:bg-blue-600 rounded transition-colors"
          >
            <MdRestore className="w-[1.5rem] h-fit" />
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default LocationModal;
