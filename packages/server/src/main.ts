import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });

  // Use cookie parser middleware
  app.use(cookieParser());

  await app.listen(3000);
  console.log("Server is running on http://localhost:3000");
}
bootstrap();
