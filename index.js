#!/usr/bin/env node
import process from "node:process"
import { program } from "commander"
program.command("add").description("add expense")
.requiredOption("--description <text>","add description")
.requiredOption("--amount <number>","add amount")
.action((option)=>{
  console.log(option.amount,option.description)
})
program.command("delete").description("delete the expense with given id")
.requiredOption("--id <number>","give the id")
.action((option)=>{
  console.log(option.id)
})
program.command("list")
.description("list of expenses")
.action(()=>{
    console.log("ok");
})
program.command("summary")
.description("total expense")
.action(()=>{
    console.log("ok1");
})

program.parse(process.argv)
