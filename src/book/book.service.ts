import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    await this.findByBarCode(data.bar_code);
    const book = await this.prisma.book.create({ data });
    return book;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(bookId: string) {
    const book = await this.prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async findByBarCode(barCode: string) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: barCode,
      },
    });
    if (bookExists)
      throw new BadRequestException('Already have a book with this bar code');
  }

  async update(data: UpdateBookDto) {
    await this.findOne(data.id);
    await this.findByBarCode(data.bar_code);
    return await this.prisma.book.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
