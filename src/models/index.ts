export interface GetUserResourcesResponse {
  coins: number;
  energy: UserEnergy;
  earnedPerHour: boolean;
}

export interface UserEnergy {
  energy: number;
  time: Date;
  level: number;
}

export interface Result {
  isSuccess: boolean;
}

export interface LoginResponse {
  isLoggedIn: boolean;
  firstClaimed: boolean;
}

export interface AgeResponse {
  age: number;
  reward: number;
}
