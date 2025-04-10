import PoliticalSide from "../../entities/PoliticalSide";

export const politicalColors: { [key: number]: string } = {
  [PoliticalSide.FAR_RIGHT]: '#000000',
  [PoliticalSide.RIGHT]: '#0000FF',
  [PoliticalSide.CENTER]: '#FFA500',
  [PoliticalSide.LEFT]: '#FF69B4',
  [PoliticalSide.FAR_LEFT]: '#FF0000'
};
