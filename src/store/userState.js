import { atom } from "recoil";

export const userstate = atom ({
  key: "userState",
  default: { isAdmin: false }
});