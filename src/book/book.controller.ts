import {
  Controller,
  HttpCode,
  Post,
  Put,
  Delete,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() book: CreateBookDto) {
    return await this.bookService.create(book);
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get('/findOne')
  async findOne(@Query('bookId') bookId: string) {
    return await this.bookService.findOne(bookId);
  }

  @Put()
  async update(@Body() data: UpdateBookDto) {
    return await this.bookService.update(data);
  }

  @Delete()
  @HttpCode(204)
  async delete(@Query('id') id: string) {
    await this.bookService.delete(id);
  }
}
