import { IsMongoId } from "class-validator";

export class ExpenseIdValidatorDTO{
    @IsMongoId()
    id:string
}