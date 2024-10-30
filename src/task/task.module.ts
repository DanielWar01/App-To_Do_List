/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';


@Module({
    providers: [TaskService, PrismaService, JwtService],
    controllers: [TaskController]
})
export class TaskModule {}
