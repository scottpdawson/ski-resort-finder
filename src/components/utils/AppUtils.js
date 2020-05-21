export function shouldShowResort(
  resort,
  verticalFilter,
  maxVertical,
  searchTerm,
  passFilter,
  verticalUnits
) {
  let verticalFiltered =
    verticalFilter.min > 0 || verticalFilter.max < maxVertical;

  let shouldIncludeResort = true;

  if (verticalFiltered) {
    let verticalMultiplier = verticalUnits === "imperial" ? 3.28084 : 1;
    if (
      !resort.vertical ||
      resort.vertical * verticalMultiplier <
        verticalFilter.min * verticalMultiplier ||
      resort.vertical * verticalMultiplier >
        verticalFilter.max * verticalMultiplier
    ) {
      shouldIncludeResort = false;
    }
  }

  if (searchTerm.length > 2) {
    var resortName = resort.name.toLowerCase();
    if (!resortName.includes(searchTerm.toLowerCase())) {
      shouldIncludeResort = false;
    }
  }

  if (passFilter !== "all" && passFilter === "epic" && !resort.isEpic) {
    shouldIncludeResort = false;
  }

  if (passFilter !== "all" && passFilter === "ikon" && !resort.isIkon) {
    shouldIncludeResort = false;
  }

  return shouldIncludeResort;
}

export function getTotal(obj, value) {
  return Object.keys(obj).reduce(function (sum, key) {
    return sum + obj[key][value];
  }, 0);
}

function getCenterOfPolygon(points) {
  const xCoordinates = points.map((thisCoordinate) => {
    return thisCoordinate[0];
  });
  const yCoordinates = points.map((thisCoordinate) => {
    return thisCoordinate[1];
  });

  var minX = Math.min(...xCoordinates);
  var maxX = Math.max(...xCoordinates);
  var minY = Math.min(...yCoordinates);
  var maxY = Math.max(...yCoordinates);

  return [(maxY + minY) / 2, (maxX + minX) / 2];
}

export function getPointForResort(resort) {
  if (resort.geometry.type === "Point") {
    return [resort.geometry.coordinates[1], resort.geometry.coordinates[0]];
  } else if (resort.geometry.type === "Polygon") {
    // future: get the center of more than one of the sets of polygons?
    return getCenterOfPolygon(resort.geometry.coordinates[0]);
  }
  return null;
}
