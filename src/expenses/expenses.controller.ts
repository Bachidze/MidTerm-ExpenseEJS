import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseIdValidatorDTO } from './dto/expense-id.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('ui')
  @Render('index') 
  async renderUI() {
    const expenses = await this.expensesService.findAll();
    return { Expense: expenses }; 
  }

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param() param:ExpenseIdValidatorDTO) {
    const { id } = param
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(@Param() param:ExpenseIdValidatorDTO, @Body() updateExpenseDto: UpdateExpenseDto) {
    const { id } = param
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param() param:ExpenseIdValidatorDTO) {
    const { id } = param
    return this.expensesService.remove(id);
  }
}
