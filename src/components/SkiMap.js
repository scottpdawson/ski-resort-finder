import React, { Component } from "react";
import { 
  Map, 
  TileLayer, 
  CircleMarker, 
  Popup 
} from "react-leaflet";
import {
  attribution,
  tileUrl,
  getMarkerColor,
  defaultMapState,
} from './utils/SkiMapUtils';
import SkiMapTooltip from './SkiMapTooltip';
import "leaflet/dist/leaflet.css";

export default class SkiMap extends Component {
    state = defaultMapState;
    render() {
        return this.props.resorts ? (
        <Map
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
            {this.props.resorts.map((resort, idx) => 
                <CircleMarker 
                    key={`resort-${resort.id}`}
                    color={getMarkerColor(resort)}
                    opacity={1}
                    radius={5}
                    weight={1}
                    onClick={() => { 
                        this.setState({ activeResort: resort });
                    }}
                    center={resort.point}>
                </CircleMarker>
            )}
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
        </Map>
        ) : (
            "Data is loading..."
        );
    }
}