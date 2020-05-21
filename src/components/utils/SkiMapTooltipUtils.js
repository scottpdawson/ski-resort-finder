import React from "react";
import { numberFormat } from './Format';

export function getLift(liftType, liftLabel) {
  if (liftType && liftType.count) {
    let suffix = liftType.count > 1 ? "s" : "";
    return (
      <span className="lift-metric">
        <b>{liftType.count}</b> {liftLabel}
        {suffix}
      </span>
    );
  }
}

export function getRun(runDetails, runLabel, totalRuns) {
  let runLabelIdx = runLabel.toLowerCase();
  if (runDetails && runDetails.byDifficulty) {
    if (runDetails.byDifficulty[runLabelIdx]) {
      return (
        <span>
          <b>{runDetails.byDifficulty[runLabelIdx].count}</b>
          <span className="stat-pct">
            {numberFormat((runDetails.byDifficulty[runLabelIdx].count / totalRuns) * 100, 1)}%
          </span>
        </span>
      );
    }
  }
}

export function getRunDistance(
  runDetails,
  runLabel,
  verticalSuffix,
  totalRunKm
) {
  let runLabelIdx = runLabel.toLowerCase();
  let distanceMultiplier = verticalSuffix === "m" ? 1 : 0.621371;
  if (runDetails && runDetails.byDifficulty) {
    if (runDetails.byDifficulty[runLabelIdx]) {
      return (
        <span>
          <b>
            {numberFormat(runDetails.byDifficulty[runLabelIdx].lengthInKm * distanceMultiplier, 1)}
          </b>
          <span className="stat-pct">
            {numberFormat((runDetails.byDifficulty[runLabelIdx].lengthInKm / totalRunKm) * 100, 1)}%
          </span>
        </span>
      );
    }
  }
}
