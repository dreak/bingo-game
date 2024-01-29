export interface WinningNumberStatusDto {
  openedWinningNumbers: number[];
  userLinkedLines: [
    {
      userName: string;
      linkedLines: number;
    }
  ];
}
