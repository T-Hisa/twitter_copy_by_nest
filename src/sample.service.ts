import { Injectable } from "@nestjs/common";

@Injectable()
export class SampleService {
  private readonly sample: string[] = [];

  getAll(): string[] {
    return this.sample
  }
}