import { civiliteTypes, roleTypes } from "../types";

export interface PangolinInterface {
  _id: string;
  email: string;//
  password?: string;//
  name: string;//
  civilite: civiliteTypes;//
  role: roleTypes;//
  ami?: any;//
  createdAt?: Date;
  updateAt?: Date;
  lastLogin? : Date;
}

export interface LoginInterface {
  email: string,
  password: string
}
