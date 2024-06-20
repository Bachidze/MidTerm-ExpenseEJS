import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Expense {
    
  @Prop({ required: true, min: 150, max: 2500 })
  cost: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: Date.now })
  createdAt: Date;

}


export const ExpenseSchema = SchemaFactory.createForClass(Expense)