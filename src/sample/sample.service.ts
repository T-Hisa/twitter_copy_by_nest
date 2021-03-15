import { Injectable } from '@nestjs/common';
import { SampleInterface } from './sample.interface';

@Injectable()
export class SampleService {
  private readonly sample: SampleInterface[];

  // constructor(s: SampleInterface) {
  //   if (s) this.sample = [s];
  //   else this.sample = [{ sample: 'sample' }];
  // }

  getAll(): SampleInterface[] {
    return this.sample;
  }

  create(sample: SampleInterface) {
    this.sample.push(sample)
  }
}
