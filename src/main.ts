import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

const start = async () => {
    try {
        const PORT = 80
        const app = await NestFactory.create(AppModule)

        await app.listen(PORT, () => console.log(`Server is working on ${PORT} port`))
    } catch (err) {
        console.log(err)
    }
}

start()