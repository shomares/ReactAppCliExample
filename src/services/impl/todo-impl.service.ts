import { injectable } from "inversify";
import { Result } from "../../model/result";
import { Todo } from "../../model/todo";
import { TodoService } from "../todo.service";
import { fetchAuth } from "./auth-impl-service";

@injectable()
export class TodoImplService implements TodoService {

    async insert(item: Todo): Promise<Result<void>> {
        const result = await fetchAuth('todo', {
            method: 'POST',
            body: JSON.stringify(item)
        })

        return await result.json()
    }


    async getAll(): Promise<Result<Todo[]>> {
        const result = await fetchAuth('todo', {
            method: 'GET'
        })

        return await result.json()
    }

    async cancel(id: string): Promise<Result<void>> {
        const result = await fetchAuth(`todo/${id}`, {
            method: 'DELETE'
        })

        return await result.json()
    }

    async complete(id: string): Promise<Result<void>> {
        const result = await fetchAuth(`todo/${id}`, {
            method: 'PUT'
        })

        return await result.json()
    }

}