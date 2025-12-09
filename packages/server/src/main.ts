import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  // Use cookie parser middleware
  app.use(cookieParser());

  await app.listen(3000);
  console.log("Server is running!");
}
bootstrap();
