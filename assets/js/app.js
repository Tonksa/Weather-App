import '@styles/app.scss';
import React from "react";
import { createRoot } from "react-dom/client";
import WeatherApp from './WeatherApp.js';

const root = createRoot(document.querySelector('#weatherapp'))
root.render(
    <WeatherApp />
);