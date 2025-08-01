"use client";

import { Property } from "@/types";
import React, { useEffect, useState, useRef } from "react";

import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import Spinner from "./Spinner";

import { geocode } from "opencage-api-client";

const PropertyMap = ({ property }: { property: Property }) => {
  const mapContainer = useRef(null);
  const map = useRef<maptilersdk.Map | null>(null);

  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      const hasLatLng =
        property.location.latitude && property.location.longitude;
      if (hasLatLng) {
        setLat(property.location.latitude as string);
        setLng(property.location.longitude as string);
      } else {
        const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
        const encodedAddress = encodeURIComponent(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode} ${property.location.country}`
        );

        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch geocoding data");
        }

        const data = await res.json();

        if (data.results.length === 0) {
          setGeocodeError(true);
          setLoading(false);
        } else {
          const { lat, lng } = data.results[0].geometry;
          setLat(lat);
          setLng(lng);
        }
      }
      setLoading(false);
    };

    fetchCoords();
  }, []);

  //google map
  useEffect(() => {
    if (map.current) return;
    if (!loading && lat !== null && lng !== null) {
      maptilersdk.config.apiKey = process.env
        .NEXT_PUBLIC_MAPTILER_API_KEY as string;

      map.current = new maptilersdk.Map({
        container: mapContainer.current!,
        style: maptilersdk.MapStyle.STREETS,
        center: [parseFloat(lng), parseFloat(lat)],
        zoom: 15,
      });

      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([parseFloat(lng), parseFloat(lat)])
        .addTo(map.current);
    }
  }, [lng, lat, loading]);

  if (loading) return <Spinner loading={loading} />;

  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    <div
      ref={mapContainer}
      style={{ height: "500px", width: "100%" }}
      className="map"
    />
  );
};

export default PropertyMap;
