import { ScoreBoard } from '../src';
import { Road } from '../src/roads/road';

function printRoad<T extends object>(
  this: void,
  road: Road<T>,
  selector: (this: void, item: T) => string,
): void {
  const chars: string[] = [];
  for (let row = 0; row < road.rowCount; row++) {
    for (let column = 0; column < road.columnCount; column++) {
      const item = road.getItem(row, column);
      // Do whatever you want with item data;
      chars.push(`${item ? selector(item) : ' '}`);
      // console.log(item)
    }

    chars.push('\n');
  }
  global.console.log(chars.join(''));
}

// Data input;
const input: ReadonlyArray<string> = [
  'R6nn',
  'B7nn',
  'B3nn',
  'B3nn',
  'R8nn',
  'R8rn',
  'B7rn',
  'G8nn',
  'B7nn',
  'R4n',
  'B6n',
  'R9n',
  'B9n',
  'R4n',
  'R5n',
  'R9n',
  'R7n',
  'B8n',
  'R7n',
  'B7n',
  'R8n',
  'R5n',
  'B8r',
  'B8n',
  'B8n',
  'B8n',
  'B9n',
  'R4n',
  'R4n',
  'B7r',
  'B4n',
  'B8b',
  'R5n',
  'R6n',
  'R7n',
  'B8n',
  'B8n',
  'B8n',
  'R6n',
  'R5n',
  'R8n',
  'R8b',
  'R8n',
  'R9n',
  'R9n',
  'R9n',
  'R9n',
  'B9n',
  'B8n',
  'B9n',
  'B8n',
  'B9n',
  'B8n',
  'B9n',
  'B8n',
  'B9n',
  'B8n',
  'R5n',
  'R7n',
  // // 'G3n','R5n','R9n','B5n','B3n','R4n','B8n','B9n','B6b','R7n','R8n','R7n','B9n','R8n','R8r','R6n',
  // 'G9n','R2b','R8n','B9n','R8n','B7n','R2r','R9n','G0b','R4n','R4n','B9n','B6n','B3n','R4n','B7n',
  // 'R8n','R4r','R9n','B9n','R8n','R5n','R8n','R8n','B3n','B9n','G9n','R9n','B7r','B6n','B7r','R6n',
  // 'G0a','R3n','R6r','R4n','R8n','R6n','B8n','B8n','B9n','G5n','G7n','R9n','B9n','R3n','B8n','R8n',
  // 'R7n','B6n','B8n','R9r','B8r','R7r','B8n','B9r','B9n','B7n','B9n','B4n','G5n','R1n','B7n','R9n',
  // 'R9n','R9n','R6n','B6n','R9n','B8n','R5n','R5n','R6n','R6n','R5n','B7n','B7n','B3n','B7n','R5n',
  // 'R5n','B9n','B6n','B7n','B9n','R9n','R6b','B6n','B2n','B9n','B8n','R9n','B8n','R9n','R9n','B6n',
  // 'B2n','B7n','B8n','R8b','G6n','B6n','B3b','B7n','R9n','B6n','G7n','B7n','G7n','G5n','B8n','R4n',
  // 'B6n','G8n','R7n','G6n','B8n','B8n','G6b','G9n','R7n','B8n','R5n','B9n','B6n','B6n','B9n','R9n',
  // 'B7n','R8r','R4n','R6n','B6b','B8n','B7n','R7r','B7n','B7n','R8n','B9n','G9n','B9n','B9n','R5n',
  // 'R9n','R9n','R7n','R6n','R5n','G7n','B8b','R8n','B3n','B9n','B8n','B5n','R6n','B6n','B3n','B9n',
  // 'G7n','R9n','G6n','G6a','R5n','G9n','B6n','B6r','B8n',
];

const board = ScoreBoard.fromRawData(input);
const beadRoad = board.getBeadRoad(6, 6);
const bigRoad = board.getBigRoad(6, 80);
// console.log(bigRoad);
const bigEyeRoad = board.getBigEyeRoad(6, 38);
const smallRoad = board.getSmallRoad(6, 19);
const cockroachRoad = board.getCockroachRoad(6, 19);

// printRoad(beadRoad, item => item.result.toString());
printRoad(bigRoad, item => item.strResult);
// printRoad(bigRoad, item => item.pairResult.toString());
printRoad(bigEyeRoad, item => (item.repetition ? 'R' : 'B'));
printRoad(smallRoad, item => (item.repetition ? 'R' : 'B'));
printRoad(cockroachRoad, item => (item.repetition ? 'R' : 'B'));

const handler = <T extends object>(
  this: void,
  item: T | undefined,
  rowIndex: number,
  columnIndex: number,
): void => global.console.log(`[${rowIndex}, ${columnIndex}]:`, item);
// beadRoad.forEach(handler);
// bigRoad.forEach(handler);
// bigEyeRoad.forEach(handler);
// smallRoad.forEach(handler);
// cockroachRoad.forEach(handler);

global.console.log('Banker:', board.bankerCount);
global.console.log('Player:', board.playerCount);
global.console.log('Tie:', board.tieCount);
global.console.log('Natural:', board.naturalCount);
global.console.log('BankerPair:', board.bankerPairCount);
global.console.log('PlayerPair:', board.playerPairCount);

global.console.log(
  'PlayerPrediction:',
  bigEyeRoad.playerPrediction,
  smallRoad.playerPrediction,
  cockroachRoad.playerPrediction,
);
global.console.log(
  'BankerPrediction:',
  bigEyeRoad.bankerPrediction,
  smallRoad.bankerPrediction,
  cockroachRoad.bankerPrediction,
);
