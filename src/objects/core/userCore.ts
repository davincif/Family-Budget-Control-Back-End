export type UserPartialCore = {
  id?: number;
  email?: string;
  name?: string;
  birth?: Date;
  password?: string;
  creation?: Date;
  lastEdition?: Date;
  active?: boolean;
};

export type UserCore = {
  id: number;
  email: string;
  name: string;
  birth: Date;
  password: string;
  creation: Date;
  lastEdition?: Date;
  active: boolean;
};
