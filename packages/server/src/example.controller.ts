import { Controller, Get } from "@nestjs/common";

@Controller("example")
export class ExampleController {
  @Get("hello")
  getHello(): { message: string } {
    return { message: "Hello World" };
  }
}
