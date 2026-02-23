import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../tasks/entities/user.entity';

interface AuthenticatedUser {
  id: number;
  email: string;
  username: string;
}

interface LoginDto {
  email: string;
  password?: string;
}

interface RegisterDto {
  email: string;
  password: string;
  username: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const adminEmail = 'admin@test.com';
    const adminExists = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('123', 10);
      const admin = this.userRepository.create({
        username: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
      });
      await this.userRepository.save(admin);
    }
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<AuthenticatedUser | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(pass, user.password))) {
      return {
        id: user.id,
        email: user.email,
        username: user.username,
      };
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    if (!loginDto.email || !loginDto.password) {
      throw new UnauthorizedException('Faltan credenciales');
    }

    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
    };
  }

  async register(userData: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(newUser);

      return {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
      };
    } catch {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }
}
