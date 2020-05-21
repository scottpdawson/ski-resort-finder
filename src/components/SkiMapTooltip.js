import React, { Component } from "react";
import { numberFormat } from './utils/Format';
import {
  getLift,
  getRun,
  getRunDistance,
} from './utils/SkiMapTooltipUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircle, 
  faSquare, 
  faSquareFull, 
  faQuestionCircle, 
  faMountain, 
  faTram, 
  faSkiing 
} from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'

export default class SkiMapTooltip extends Component {

  

  render() {
    let resort = this.props.resort;
    let verticalMultiplier = (this.props.verticalUnits === "imperial") ? 3.28084 : 1;
    let verticalSuffix = (this.props.verticalUnits === "imperial") ? ' ft' : 'm';

    return resort ? (
      <div className="resortCard">
        {resort.isEpic && 
          <img
            src="epic.png"
            alt="Epic Pass"
            title="Included in Epic Pass"
            style={{ float: 'right', width: '50px' }}
          />
        }
        {resort.isIkon && 
          <img
            src="ikon.png"
            alt="Ikon Pass"
            title="Included in Ikon Pass"
            style={{ float: 'right', width: '50px' }}
          />
        } 
        <b>{resort.name}</b><br />
        {resort.website && 
          <div>
            <a href={resort.website} rel="noopener noreferrer" target="_blank">Visit web site</a>
          </div>
        }
          <div className="flex-container">
            <div className="column">
              <FontAwesomeIcon alt="Mountain" size="10x" className="popover-icon mountain" icon={faMountain} />
              <span className="popover-stat">{numberFormat(resort.vertical * verticalMultiplier, 0)}{verticalSuffix}</span>
              <span className="popover-suffix popover-suffix-up">Vertical</span>
              <div className="vertical-top-bottom">
                <span className="popover-stat popover-substat">{numberFormat(resort.top * verticalMultiplier, 0)}{verticalSuffix}</span>
                <span className="popover-suffix">Top Elevation</span>
                <span className="popover-stat popover-substat">{numberFormat(resort.bottom * verticalMultiplier, 0)}{verticalSuffix}</span>
                <span className="popover-suffix">Bottom Elevation</span>
              </div>
            </div>
            {resort.lifts && <div className="column">
              <FontAwesomeIcon alt="Tram" size="10x" className="popover-icon tram" icon={faTram} />
              <span className="popover-stat">{resort.lifts}</span>
              <span className="popover-suffix popover-suffix-up">Lifts</span>
              <br />
              {getLift(resort.liftDetails.funicular, "Funicular")}
              {getLift(resort.liftDetails.cable_car, "Cable Car")}
              {getLift(resort.liftDetails.gondola, "Gondola")}
              {getLift(resort.liftDetails.chair_lift, "Chair Lift")}
              {getLift(resort.liftDetails["t-bar"], "T-Bar")}
              {getLift(resort.liftDetails.platter, "Platter Lift")}
              {getLift(resort.liftDetails.magic_carpet, "Magic Carpet")}
              {getLift(resort.liftDetails.rope_tow, "Rope Tow")}
              {getLift(resort.liftDetails.drag_lift, "Drag Lift")}
            </div>}
        </div>
        {resort.runs && <div className="flex-container">
            <div className="column">
              <FontAwesomeIcon alt="Skiing" size="10x" className="fa-flip-horizontal popover-icon skiing" icon={faSkiing} />
              <span className="popover-stat">{resort.runs}</span>
              <span className="popover-suffix popover-suffix-up">
                Runs
                {resort.totalRunKm && verticalSuffix === "m" && 
                  <span> covering <b>{numberFormat(resort.totalRunKm)}</b> km<br /></span>
                } 
                {resort.totalRunKm && verticalSuffix !== "m" && 
                  <span> covering <b>{numberFormat(resort.totalRunKm * 0.621371)}</b> mi<br /></span>
                } 
              </span>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th className="ctr"><FontAwesomeIcon title="Novice" icon={farCircle} /></th>
                    <th className="ctr"><FontAwesomeIcon title="Easy" icon={faCircle} style={{ color: "green" }} /></th>
                    <th className="ctr"><FontAwesomeIcon title="Intermediate" icon={faSquare} style={{ color: "blue" }}/></th>
                    <th className="ctr"><FontAwesomeIcon title="Advanced" icon={faSquareFull} className="black-diamond" /></th>
                    <th className="ctr">
                      <FontAwesomeIcon title="Expert" icon={faSquareFull} className="black-diamond" />
                      <FontAwesomeIcon title="Expert" icon={faSquareFull} className="black-diamond" />
                    </th>
                    <th className="ctr"><FontAwesomeIcon title="Other" icon={faQuestionCircle} /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Runs</b><span className="stat-pct">% of total</span></td>
                    <td className="ctr">{getRun(resort.runDetails, "Novice", resort.runs)}</td>
                    <td className="ctr">{getRun(resort.runDetails, "Easy", resort.runs)}</td>
                    <td className="ctr">{getRun(resort.runDetails, "Intermediate", resort.runs)}</td>
                    <td className="ctr">{getRun(resort.runDetails, "Advanced", resort.runs)}</td>
                    <td className="ctr">{getRun(resort.runDetails, "Expert", resort.runs)}</td>
                    <td className="ctr">{getRun(resort.runDetails, "Other", resort.runs)}</td>
                  </tr>
                  <tr>
                    <td><b>Dist ({verticalSuffix === "m" ? "km" : "mi"})</b><span className="stat-pct">% of total</span></td>
                    <td className="ctr">{getRunDistance(resort.runDetails, "Novice", verticalSuffix, resort.totalRunKm)}</td>
                    <td className="ctr">{getRunDistance(resort.runDetails, "Easy", verticalSuffix, resort.totalRunKm)}</td>
                    <td className="ctr">{getRunDistance(resort.runDetails, "Intermediate", verticalSuffix, resort.totalRunKm)}</td>
                    <td className="ctr">{getRunDistance(resort.runDetails, "Advanced", verticalSuffix, resort.totalRunKm)}</td>
                    <td className="ctr">{getRunDistance(resort.runDetails, "Expert", verticalSuffix, resort.totalRunKm)}</td>
                    <td className="ctr">{getRunDistance(resort.runDetails, "Other", verticalSuffix, resort.totalRunKm)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>}
      </div>
    ) : (
      ""
    );
  }
}