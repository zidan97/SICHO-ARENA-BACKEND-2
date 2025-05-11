import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {


  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {
    this.reviewModel = reviewModel;
  }
  async create(createReviewDto: CreateReviewDto) {
    const createReview = new this.reviewModel(createReviewDto);
    return await createReview.save();
  }

  async findAll() {
    return await this.reviewModel.find().sort({ _id: -1 });
  }
  async find3reviews() {
    return await this.reviewModel.find().sort({ _id: -1 }).limit(3);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} review`;
  // }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} review`;
  // }
}
