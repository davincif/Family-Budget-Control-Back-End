export type UserPartialTrans = {
  id?: number;
  email: string;
  name: string;
  birth: string;
  password?: string;
  creation?: string;
  lastEdition?: string;
  active?: boolean;
};

export type UserTrans = {
  id: number;
  email: string;
  name: string;
  birth: string;
  password: string;
  creation: string;
  lastEdition?: string;
  active: boolean;
};
