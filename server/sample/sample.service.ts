import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board, BoardDocument } from '../boards/board.schema';
import { User, UserDocument } from '../users/user.schema';
import { SampleInterface } from './sample.interface';
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class SampleService {
  // private readonly sample: SampleInterface[];
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService
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

  async getStatic () {
    return 'sample html!'
    // const basePath = 'public/public'
    // const filePath = path.resolve(path.join(basePath, 'index.html'))
    // console.log('filePath', filePath)
    // return new Promise((resolve, reject) => {
    //   fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(data);
    //     }
    //   });
    // });
  }

  create(sample: SampleInterface) {
    // this.sample.push(sample)
  }
}
