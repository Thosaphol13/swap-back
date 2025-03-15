import { Controller, Post, Body, Get, Query, Param, Put, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ICommented } from 'src/interface/Comments.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  async createComment(@Body() createCommentDto: ICommented) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Post('reply/:parentId')
  async replyComment(@Param('parentId') parentId: number, @Body() replyDto: ICommented) {
    return this.commentsService.replyComment(replyDto, parentId );
  }


  @Get('product')
  async getCommentsByProduct(@Query('product_id') product_id: number) {
    const comments = await this.commentsService.getCommentsByProduct(product_id);
    console.log(comments); // ✅ ตรวจสอบว่า parentId มีค่าหรือไม่
    return comments;
  }
  

  @Get('user')
  async getCommentsByUser(@Query('user_id') user_id: number) {
    return this.commentsService.getCommentsByUser(user_id);
  }
  @Put('update/:id')
  async updateComment(
    @Param('id') id: number, 
    @Body('content') content: string, 
    @Body('userId') userId: number
  ) {
    return this.commentsService.updateComment(id, content, userId);
  }

  // เพิ่ม endpoint สำหรับการลบคอมเมนต์
  @Delete('delete/:id')
  async deleteComment(@Param('id') id: number, @Body('userId') userId: number) {
    return this.commentsService.deleteComment(id, userId);
  }
}
