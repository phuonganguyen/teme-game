export interface GetUserResourcesResponse {
  coins: number;
  energy: UserEnergy;
}

export interface UserEnergy {
  energy: number;
  time: Date;
  level: number;
}

export interface Result {
  isSuccess: boolean;
}
