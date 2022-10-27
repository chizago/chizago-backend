import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMatchInput } from './createMatch.input';

@InputType()
export class UpdateMatchInput extends PartialType(CreateMatchInput) {}
