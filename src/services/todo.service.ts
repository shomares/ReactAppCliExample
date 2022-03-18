import { Result } from "../model/result";
import { Todo } from "../model/todo";

export interface TodoService{
    getAll(): Promise<Result<Todo[]>>
    cancel(id: string): Promise<Result<void>>
    complete(id: string): Promise<Result<void>>
    insert(item: Todo): Promise<Result<void>>
}