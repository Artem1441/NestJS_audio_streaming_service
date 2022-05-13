import { Body, Controller, Get, Param, Post, Delete, UploadedFiles, UseInterceptors, Query } from "@nestjs/common";
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from "mongoose";
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller("/tracks")
export class TrackController {
    constructor(private trackService: TrackService) { }

    // http://localhost/tracks
    // Form Fields: name = "Alone", artist = "NBSPLV", text = "Some words...".  Files: picture = "name.jpg", audio = "audio.mp3"
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() createTrackDto: CreateTrackDto) {
        const { picture, audio } = files
        return this.trackService.create(createTrackDto, picture[0], audio[0])
    }

    // http://localhost/tracks?count=2&offset=1
    @Get()
    getAll(
        @Query("count") count: number,
        @Query("offset") offset: number
    ) {
        return this.trackService.getAll(count, offset)
    }

    // http://localhost/tracks/search?query=3
    @Get("/search")
    search(@Query("query") query: string) {
        return this.trackService.search(query)
    }

    // http://localhost/tracks/627a159efe92d9a1223bd44d
    @Get(":id")
    getOne(@Param("id") id: ObjectId) {
        return this.trackService.getOne(id)
    }

    // http://localhost/tracks/627a159efe92d9a1223bd44d
    @Delete(":id")
    delete(@Param("id") id: ObjectId) {
        return this.trackService.delete(id)
    }

    // http://localhost/tracks/comment
    // {"username": "Alex","text": "The music is cool","trackId": "627a1588fe92d9a1223bd44b"}
    @Post("/comment")
    addComment(@Body() createCommentDto: CreateCommentDto) {
        return this.trackService.createComment(createCommentDto)
    }

    // http://localhost/tracks/listen/627a29e0e78abadf0c7b1302
    @Post("/listen/:id")
    listen(@Param("id") id: ObjectId) {
        return this.trackService.listen(id)
    }
}