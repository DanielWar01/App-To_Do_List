/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('task') // Tag for the Swagger documentation
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @UseGuards(JwtGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new task' })
    @ApiResponse({ status: 201, description: 'Task successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid task data provided.' })
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @UseGuards(JwtGuard)
    @Get()
    @ApiOperation({ summary: 'Retrieve all tasks for the authenticated user' })
    @ApiResponse({ status: 200, description: 'Returns an array of all tasks for the authenticated user.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    findAll() {
        return this.taskService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Retrieve details of a specific task by ID' })
    @ApiResponse({ status: 200, description: 'Returns details of the task with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(+id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update a specific task by ID' })
    @ApiResponse({ status: 200, description: 'Task successfully updated.' })
    @ApiResponse({ status: 400, description: 'Invalid data for task update.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(+id, updateTaskDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a specific task by ID' })
    @ApiResponse({ status: 200, description: 'Task successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Task not found.' })
    remove(@Param('id') id: string) {
        return this.taskService.remove(+id);
    }
}
