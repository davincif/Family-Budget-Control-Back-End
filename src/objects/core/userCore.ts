export type UserPartialCore = {
  id?: number;
  name?: string;
  birth?: Date;
  creation?: Date;
  lastEdition?: Date;
  active?: boolean;
};

export type UserCore = {
  id: number;
  name: string;
  birth: Date;
  creation: Date;
  lastEdition?: Date;
  active: boolean;
};
