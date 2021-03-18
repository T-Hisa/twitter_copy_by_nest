import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from 'src/board.schema';
import { User, UserDocument } from 'src/user.schema';
import { SampleInterface } from './sample.interface';

@Injectable()
export class SampleService {
  // private readonly sample: SampleInterface[];
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // constructor(s: SampleInterface) {
  //   if (s) this.sample = [s];
  //   else this.sample = [{ sample: 'sample' }];
  // }

  async findAll() {
    const boardObject = await this.boardModel.find().populate('user').exec()
    // const boardObject = await this.boardModel.find().exec()
    const userObject = await this.userModel.find().exec()
    // return boardObject.concat(userObject)
    // return Object.assign(boardObject, userObject)
    // return userObject
    return boardObject
  }

  // getAll(): SampleInterface[] {
  //   return this.sample;
  // }

  create(sample: SampleInterface) {
    // this.sample.push(sample)
  }
}
