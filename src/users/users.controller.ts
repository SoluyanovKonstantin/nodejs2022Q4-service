import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUser(id);
    }

    @Post()
    async createUser(@Body() userDto: CreateUserDto) {
        const userToDB = this.usersService.createUser(userDto);

        return userToDB;
    }

    @ApiParam({ name: 'id' })
    @Put(':id')
    updateUserPassword(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateUserDto,
    ) {
        return this.usersService.updateUserPassword(body, id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}
