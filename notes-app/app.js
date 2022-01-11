const chalk = require("chalk");
const getNotes = require("./notes.js");
const yargs = require("yargs"); // command line의 옵션 인수를 파싱하는 package

// console.log(process.argv);

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "add  a new note",
  builder: {
    title: {
      describe: "No title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title : " + argv.title);
    console.log("Body : " + argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "remove  a new note",
  handler: function () {
    console.log("Removing a new note!");
  },
});

// Create list command
yargs.command({
  command: "List",
  describe: "List  a new note",
  handler: function () {
    console.log("Listing a new note!");
  },
});

// Create list command
yargs.command({
  command: "Read",
  describe: "Read  a new note",
  handler: function () {
    console.log("Reading a new note!");
  },
});

// console.log(yargs.argv);
yargs.parse();
