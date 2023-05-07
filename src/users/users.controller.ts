import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { UpdatePasswordDto, User, UserDto } from './user.interface';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersInterceptor } from 'src/users.interceptor';

@UseInterceptors(new UsersInterceptor())
@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @ApiParam({ name: 'id' })
    @Get(':id')
    getUser(@Param('id', ParseUUIDPipe) id: string): User {
        return this.usersService.getUser(id);
    }

    @Post()
    async createUser(@Body() userDto: UserDto) {
        const userToDB = this.usersService.createUser(userDto);

        return userToDB;
    }

    @ApiParam({ name: 'id' })
    @Put(':id')
    updateUserPassword(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdatePasswordDto,
    ): User {
        return this.usersService.updateUserPassword(body, id);
    }

    @HttpCode(204)
    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        this.usersService.deleteUser(id);
    }
}
