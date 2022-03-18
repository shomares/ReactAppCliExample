import { Container } from "inversify";
import { TodoImplService } from "../services/impl/todo-impl.service";
import { TodoService } from "../services/todo.service";
import { TYPES } from "./types";

export function getContainer() {
    const myContainer = new Container()
    myContainer.bind<TodoService>(TYPES.TodoService).to(TodoImplService)
    return myContainer
}
