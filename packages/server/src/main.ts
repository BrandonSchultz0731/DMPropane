import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const allowedHostsString = configService.get<string>("CORS_ORIGIN") || ''
  const origin = JSON.parse(allowedHostsString);
  const port = configService.get<number>("PORT") || 3000;
  app.enableCors({
    origin,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
