import { GameResult, PairResult, RoundResult } from '../round-result';
import { wrapColumn, wrapRow } from './shared';
import { SharedBigRoad } from './shared-big-road';
import { RoadArray } from './road';
import { BigRoadItem } from './big-road';
import {
  DownRoad,
  DownRoadGap,
  DownRoadItem,
  generateDownRoadData,
} from './down-road';

/**
 * 根据 BigRoad 生成 BigEyeRoad 所需一维数据
 */
function generateBigEyeRoadItemList(
  bigRoadItemGraph: RoadArray<BigRoadItem>,
): ReadonlyArray<DownRoadItem> {
  return generateDownRoadData(bigRoadItemGraph, DownRoadGap.BigEyeRoadGap);
}

/**
 * 生成 BigEyeRoad 对应的二维数组
 */
function generateBigEyeRoadGraph(
  bigEyeRoadData: ReadonlyArray<DownRoadItem>,
  rowCount: number,
  columnCount: number,
): RoadArray<DownRoadItem> {
  return wrapRow(
    wrapColumn(
      bigEyeRoadData,
      (previousItem, currentItem) =>
        previousItem.repetition === currentItem.repetition,
    ),
    rowCount,
    columnCount,
  );
}

export class BigEyeRoad extends DownRoad {
  protected readonly array: RoadArray<DownRoadItem>;

  public constructor(
    protected readonly row: number,
    protected readonly column: number,
    protected readonly roundResults: ReadonlyArray<RoundResult>,
  ) {
    super(row, column, roundResults);
    const bigRoad = new SharedBigRoad(row, roundResults.length, roundResults);
    const bigEyeRoadData = generateBigEyeRoadItemList(bigRoad.rawArray);
    this.array = generateBigEyeRoadGraph(bigEyeRoadData, row, column);
  }

  /**
   * 庄问路
   * 即 下一局是庄赢的话 当前下路图的下一个 Item 是什么颜色的
   * @return {boolean} repetition - true 为红色 false 为蓝色
   */
  public get bankerPrediction(): boolean | undefined {
    const fakeNextRound: RoundResult = {
      order: this.roundResults.length,
      result: 0, // Dummy
      gameResult: GameResult.BankerWin,
      pairResult: PairResult.NoPair,
    };
    return this.getPrediction(fakeNextRound, DownRoadGap.BigEyeRoadGap);
  }

  /**
   * 闲问路
   * 即 下一局是闲赢的话 当前下路图的下一个 Item 是什么颜色的
   * @return {boolean} repetition - true 为红色 false 为蓝色
   */
  public get playerPrediction(): boolean | undefined {
    const fakeNextRound: RoundResult = {
      order: this.roundResults.length,
      result: 0, // Dummy
      gameResult: GameResult.PlayerWin,
      pairResult: PairResult.NoPair,
    };
    return this.getPrediction(fakeNextRound, DownRoadGap.BigEyeRoadGap);
  }
}
