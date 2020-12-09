function nextSquareRoot(num: number) {
  if (Math.floor(Math.sqrt(num)) === Math.sqrt(num)) {
    return Math.floor(Math.sqrt(num));
  } else {
    return Math.floor(Math.sqrt(num)) + 1;
  }
}

function getArrangementNumbers(size: number) {
  let num = size;
  let nsr = nextSquareRoot(num);
  let arrangement = [];
  while (num !== 0) {
    let row = Math.min(nsr, num);
    num -= row;
    arrangement.push(row);
  }
  return arrangement;
}

// diameter of PARTICIPANT
function getArrangementPositions(size: number, diameter: number, center: any) {
  let arrangement = getArrangementNumbers(size);
  let sizeY = -(size * diameter) / 2;
  let result: any[] = [];
  for (let row = 0; row < size; row += 1) {
    // if last row is odd
    if (row > 0 && arrangement[row] % 2 !== arrangement[row - 1] % 2) {
      // hypotnuse n math shit
      sizeY -= ((2 - Math.sqrt(3)) * diameter) / 2;
    }

    let sizeX = -(arrangement[row] * diameter) / 2;
    for (let i = 0; i < arrangement[row]; i += 1) {
      result.push({ left: sizeX + center.x - diameter / 2, top: sizeY + center.y - diameter / 2 });

      // radius math here
      sizeX += diameter;
    }

    // next level
    sizeY += diameter;
  }
  return result;
}

function getArrangementPositionsZoomed(size: number, diameter: number, center: any) {
  let result: any[] = [];
  for (let index = 0; index < size; index += 1) {
    result.push({ right: center.x, top: index * diameter * 1.1 });
  }
  return result;
}

export { nextSquareRoot, getArrangementPositions, getArrangementPositionsZoomed };
