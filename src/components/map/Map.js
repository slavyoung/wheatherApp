import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { setCountry } from '../store/reducer';
import ToolTip from '../toolTip/ToolTip';
import './Map.scss';

const MAPBOX_API = 'pk.eyJ1Ijoic2xhdnlvdW5nIiwiYSI6ImNrcnl3bDN2YjEwZXUzMW1rcGl5bnV5OXAifQ.QmXNYlkaGnsE8SaWV5iutQ';
mapboxgl.accessToken = MAPBOX_API;


const Map = () => {
    const dispatch = useDispatch();
    const mapContainer = useRef(null);
    const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(6);
    const [weather, setWeather] = useState(null);
    const [mapObject, setMap] = useState();
    const [error, setError] = useState(null);
    const active = useSelector((state) => (state.active), shallowEqual);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        setMap(map);

        return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
          const storedCountry = localStorage.getItem('location');
          if (storedCountry) {
            dispatch(setCountry(storedCountry));
          }
    }, []);

    const fetchLocation = async (location) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${MAPBOX_API}&limit=1`;
    
        const response = await fetch(url);
        const responseData = await response.json();
    
        if (responseData?.features?.length === 0) {
          return { latitude: null, longitude: null };
        }
    
        return {
          latitude: responseData.features[0].center[1],
          longitude: responseData.features[0].center[0],
        };
    };

    const getWeather = async (latitude, longitude, location) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aa196fb0f2cc7f4015c48e7c175c3486&units=metric`;
    
        if (!latitude || !longitude) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=aa196fb0f2cc7f4015c48e7c175c3486&units=metric`;
        }
    
        const response = await fetch(url);
    
        if (response?.status === 404) {
          setError("Uanable to get data");
          return;
        }
    
        if (!response.ok) {
          setError("Something went wrong!");
          return;
        }
    
        const responseData = await response.json();
        setWeather(responseData.main);
    };

    useEffect(() => {
      if (weather) {
          const tooltipNode = document.createElement('div');
          ReactDOM.render(<ToolTip feature={weather} />, tooltipNode);
          tooltipRef.current
            .setLngLat([lng, lat])
            .setDOMContent(tooltipNode)
            .addTo(mapObject);
      }
    }, [weather]);
    
    const onSubmitHandler = async (location) => {
    
        setWeather(null);
        setError(null);
    
        if (location?.length === 0) {
          setError("");
          return;
        }
    
        const { latitude, longitude } = await fetchLocation(location);
        if (mapObject) {
          mapObject.setCenter([longitude, latitude]);
        }
        getWeather(latitude, longitude, location);
    };

    useEffect(() => {
        localStorage.setItem('location', active);
        onSubmitHandler(active);
    }, [active]);

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
};

Map.propTypes = {};

export default Map;
