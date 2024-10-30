/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(private prismaService: PrismaService) {}

    async create(createTaskDto: CreateTaskDto) {
        try {
            return await this.prismaService.task.create({
                data: createTaskDto,
            });
        } catch (error) {
            console.log(error)

        throw new InternalServerErrorException();
        }
    }

    findAll() {
        return this.prismaService.task.findMany();
        }

        async findOne(id: number) {
            const taskFound = await this.prismaService.task.findUnique({
            where: {
                id: id,
            },
        });

        if (!taskFound) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return taskFound;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const productFound = await this.prismaService.task.update({
            where: {
                id,
            },
            data: updateTaskDto,
        });

        if (!productFound) {
            throw new NotFoundException(`Tarea con el id ${id} no encotrada`);
        }
        
        return productFound;
    }

    async remove(id: number) {
        const deletedTask = await this.prismaService.task.delete({
            where: {
            id,
            },
        });

        if (!deletedTask) {
        throw new NotFoundException(`Product with id ${id} not found`);
        }

        return deletedTask;
    }
}