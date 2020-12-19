import React, { Component } from "react";
import { 
  MapContainer, 
  TileLayer, 
  CircleMarker, 
  Popup 
} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {
  attribution,
  tileUrl,
  getMarkerColor,
  defaultMapState,
} from './utils/SkiMapUtils';
import SkiMapTooltip from './SkiMapTooltip';
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

export default class SkiMap extends Component {
    state = defaultMapState;
    render() {
        return this.props.resorts ? (
        <MapContainer
            center={[this.state.lat, this.state.lng]}
            zoom={this.state.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={this.state.minZoom}
        >
            <TileLayer
                attribution={attribution}
                url={tileUrl}
            />
            <MarkerClusterGroup>
            {this.props.resorts.map((resort, idx) => 
                <CircleMarker 
                    key={`resort-${resort.id}`}
                    color={getMarkerColor(resort)}
                    opacity={1}
                    radius={5}
                    weight={1}
                    eventHandlers={{
                        click: () => {
                            this.setState({ activeResort: resort });
                        },
                    }}
                    center={resort.point}>
                </CircleMarker>
            )}
            </MarkerClusterGroup>
            {this.state.activeResort && <Popup
                position={this.state.activeResort.point}
                onClose={() => {
                    this.setState({ activeResort: null })
                }}
            >
                <SkiMapTooltip
                    resort={this.state.activeResort}
                    verticalUnits={this.props.verticalUnits}
                />
            </Popup>}
        </MapContainer>
        ) : (
            "Data is loading..."
        );
    }
}