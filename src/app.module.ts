import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';
import { FileModule } from "./file/file.module";
import 'dotenv/config'
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path"

@Module({
    imports: [
        ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
        MongooseModule.forRoot(process.env.MONGO_CONNECTION),
        TrackModule,
        FileModule
    ]
})
export class AppModule { }