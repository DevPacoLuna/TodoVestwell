import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await hash(createUserDto.password);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: encryptedPassword,
    });

    const { password, ...newUser } = await this.usersRepository.save(user);

    return newUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
