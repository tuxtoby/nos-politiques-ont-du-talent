import politicalSide from "../data/politicalSide";

export const politicalColors: { [key: number]: string } = {
  [politicalSide.FAR_RIGHT]: '#000000',
  [politicalSide.RIGHT]: '#0000FF',
  [politicalSide.CENTER]: '#FFA500',
  [politicalSide.LEFT]: '#FF69B4',
  [politicalSide.FAR_LEFT]: '#FF0000'
};
