import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { modules } from './modules';
import { isProd } from './shared/utils/is-prod';

@Module({
  imports: [
    ...modules,
    MongooseModule.forRoot(process.env.DB_URI),
    GraphQLModule.forRoot({
      debug: !isProd(),
      playground: !isProd(),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
