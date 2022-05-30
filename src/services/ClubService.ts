import axios from "axios";

import { ClubResType } from "../types";

const CLUB_BY_SECTION_API_URL = "api/club/section";
const CLUB_BY_NAME_API_URL = "api/club/name";

export default class ClubService {
  public static async getClubsBySection(
    section: string
  ): Promise<ClubResType[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/${CLUB_BY_SECTION_API_URL}?section=${section}`
    );
    console.log(response.data);
    return response.data.data;
  }

  public static async getClubsByName(clubName: string): Promise<ClubResType[]> {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/${CLUB_BY_NAME_API_URL}?name=${clubName}`
    );
    return response.data.data;
  }
}
