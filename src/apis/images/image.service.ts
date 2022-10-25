import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>, //
  ) {}

  async createLessonImage({ image, result }) {
    return await Promise.all(
      image.map(
        (el, idx) =>
          new Promise((resolve, reject) => {
            this.imagesRepository.save({
              isMain: idx === 0 ? true : false,
              url: el,
              lesson: { id: result.id },
            });
            resolve('이미지 저장 완료');
            reject('이미지 저장 실패');
          }),
      ),
    );
  }
}
