import { PublicRoutes } from "./public";
import { PrivateRoutes } from "./private";
import { IKyonRoutes } from "../../interfaces/IKyonRoutes.ts";

export const profiles: IKyonRoutes[] = [
  PublicRoutes(),
  PrivateRoutes(),
]
