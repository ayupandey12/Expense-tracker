#!/usr/bin/env node
import process from "node:process"
import { program } from "commander"
import path from "node:path"
import os from 'os'
import { Parser } from '@json2csv/plainjs'; 
import * as fs from "node:fs"
const p=path.join(import.meta.dirname,"./expense.json");
try {
 var d= fs.readFileSync(p,"utf8");
} catch (error) {
  fs.writeFileSync(p,JSON.stringify([]),'utf8');
  var d=fs.readFileSync(p,'utf8');
}
const expenses=d?JSON.parse(d):[];

function addexpense({description,amount}){
  const size=expenses.length;
  const id=size>0?expenses[size-1].id+1:1
  const newexpense={
   id:id,
   date:new Date(),
   description:description,
   amount:Number(amount)
  }
  expenses.push(newexpense);
}
function deletebyid({id})
{
const d=expenses.filter((e)=>{return e.id!==id});
fs.writeFileSync(p,JSON.stringify(d),'utf8');
process.exit(1);
}
program.command("add").description("add expense")
.requiredOption("--description <text>","add description")
.requiredOption("--amount <number>","add amount")
.action((option)=>{
  if(option.description===''||option.amount==='0')
  {
    console.log("input data is invalid");
    process.exit(1);
  }
  addexpense({description:option.description,amount:option.amount});
})
program.command("delete").description("delete the expense with given id")
.requiredOption("--id <number>","give the id")
.action((option)=>{
  deletebyid({id:Number(option.id)});
  console.log(`${id} is deleted`);
})
program.command("list")
.description("list of expenses")
.action(()=>{
    console.log(expenses);
})
program.command("summary")
.description("total expense")
.action(()=>{
    console.log("ok1");
})
program.command("download")
.description("dowload json in csvfile")
.action(()=>{
    const targetPath = path.join(os.homedir(), 'Downloads', 'expenses.csv');

  try {
    // Automatically flattens and maps keys to CSV columns
    const parser = new Parser();
    const csv = parser.parse(expenses);

   fs.writeFileSync(targetPath, csv, 'utf-8');
    console.log(`🚀 Exported to: ${targetPath}`);
  } catch (err) {
    console.error(err);
  }
})

program.parse(process.argv)

fs.writeFileSync(p,JSON.stringify(expenses),'utf8');