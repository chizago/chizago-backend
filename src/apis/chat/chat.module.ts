import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { LessonChatMessage } from './entities/lessonChatMessage.entity';
import { LessonChatRoom } from './entities/lessonChatRoom.entity';
import { MatchChatMessage } from './entities/matchChatMessage.entity';
import { MatchChatRoom } from './entities/matchChatRoom.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatchChatRoom, //
      MatchChatMessage,
      LessonChatRoom,
      LessonChatMessage,
    ]),
  ],
  providers: [
    ChatService, //
    ChatResolver,
    ChatGateway,
  ],
})
export class ChatModule {}
