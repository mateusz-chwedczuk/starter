import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { modules } from './modules';
import { isProd } from './shared/utils/is-prod';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    ...modules,
    TypegooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ headers: req.headers }),
      debug: !isProd(),
      playground: !isProd(),
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
