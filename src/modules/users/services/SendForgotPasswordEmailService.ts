// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(data: IRequest): Promise<void> {
    console.log(data);
  }
}

export default SendForgotPasswordEmailService;
