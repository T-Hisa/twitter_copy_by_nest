import { IsInt, IsNotEmpty, IsString } from "class-validator";



export class SampleDto {
  @IsString()
  @IsNotEmpty()
  sample: string

  @IsInt()
  number: number
}