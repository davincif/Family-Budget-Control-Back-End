export type UserPartialTrans = {
  id?: number;
  name: string;
  birth: string;
  creation?: string;
  lastEdition?: string;
  active?: boolean;
};

export type UserTrans = {
  id: number;
  name: string;
  birth: string;
  creation: string;
  lastEdition?: string;
  active: boolean;
};
