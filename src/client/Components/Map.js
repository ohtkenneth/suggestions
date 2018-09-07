import React, { Component } from 'react';
import './styles/Map.css';

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  componentDidMount() {
    // attach map to div
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
  render() {
    return (
      <div id="map">
      </div>
    )
  }
}