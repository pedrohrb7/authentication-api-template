export interface IUserController {
  findAll(params: any): Promise<any[]>;
  findById(id: string): Promise<any>;
  create(userData: any): Promise<any>;
  update(userData: any): Promise<any>;
  delete(id: string): Promise<void>;
}

export interface IUserService {
  findAll(params: any): Promise<any[]>;
  findById(id: string): Promise<any>;
  create(userData: any): Promise<any>;
  update(userData: any): Promise<any>;
  delete(id: string): Promise<void>;
}
