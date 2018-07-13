import { BaseModel } from '@api/model/base.model'

export class UserProfile extends BaseModel {
  public username: string;
  public email: string;
  public roles: string[];
  public portfolios: UserProfilePortfolio[];
  public portfolio_structures: UserProfileStructure[];
}

interface UserProfilePortfolio {
    id:any;
    name: string;
}

interface UserProfileStructure {
  id:any;
  name: string;
}

