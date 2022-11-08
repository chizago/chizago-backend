import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import 'dotenv/config';
import { AppController } from './app.controller';
import { ApplicantsModule } from './apis/applicants/applicants.module';
import { FileModule } from './apis/files/file.module';
import { ImageModule } from './apis/images/image.module';
import { LessonsModule } from './apis/lessons/lessons.module';
import { LocationsModule } from './apis/locations/locations.module';
import { MatchStylesModule } from './apis/matchStyles/matchStyles.module';
import { UsersModule } from './apis/users/user.module';
import { MatchesModule } from './apis/matches/matchings.module';
import { ClassApplicantsModule } from './apis/classApplicants/classApplicants.module';
import { ReportsModule } from './apis/reports/reports.module';
import { ClassReviewModule } from './apis/classReviews/classReview.module';

@Module({
  imports: [
    ApplicantsModule,
    FileModule,
    ImageModule,
    LessonsModule,
    LocationsModule,
    MatchesModule,
    MatchStylesModule,
    ReportsModule,
    ClassApplicantsModule,
    UsersModule,
    ClassReviewModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
