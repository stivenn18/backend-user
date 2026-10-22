import { Controller, Post, Body } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('rol')
export class RolController {

    constructor(
        private readonly rolService: RolService,
    ) { }

    @Post()
   async create(@Body() dto: CreateRolDto){
        return await this.rolService.create(dto);  
}

}
