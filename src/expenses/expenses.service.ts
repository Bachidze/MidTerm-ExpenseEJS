import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private ExpenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const CreatedExpense = await this.ExpenseModel.create(createExpenseDto);
      await CreatedExpense.save();
      return CreatedExpense;
    } catch (er) {
      throw new BadRequestException(
        'Cost,Description and category is Required also cost must be Over 150 and less 2500',
      );
    }
  }

  findAll() {
    return this.ExpenseModel.find();
  }

  async findOne(id: string) {
    const findExpenseByID = this.ExpenseModel.findById(id);
    if (!findExpenseByID) throw new NotFoundException('User Not Found');
    return findExpenseByID;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const updateExpense = await this.ExpenseModel.findByIdAndUpdate(id,{...updateExpenseDto,$inc:{__v:1}},{new:true,runValidators:true})
    return updateExpense
  }

  async remove(id: string) {
    try {
      const removedExpense = await this.ExpenseModel.findByIdAndDelete(id);
      if (!removedExpense) throw new NotFoundException('User Not Found');
      return removedExpense;
    } catch (er) {
      throw new BadRequestException('Choose Correct ID');
    }
  }
}
