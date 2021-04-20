import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Get()
  async getAll() : Promise<User[]> {
    return this.userService.getAll();
  }  

  @UseGuards(JwtAuthGuard)
  @Get(':id') 
  async findById(@Param('id') id: string): Promise<User>{
    return this.userService.findById(id);
  }

  
}
