const chalk = require("chalk");
const yargs = require("yargs"); // command line의 옵션 인수를 파싱하는 package
const notes = require("./src/notes.js");
const { argv } = require("yargs");

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
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "remove  a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function () {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: "list",
  describe: "list  a new note",
  handler: function () {
    notes.listNotes();
  },
});

// Create list command
yargs.command({
  command: "read",
  describe: "read  a new note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function () {
    notes.readNotes(argv.title);
  },
});

// console.log(yargs.argv);
 yargs.parse();

//  console.log(`a : ${notes.a}, b : ${notes.b} `)
//  console.log(`a : ${a}, b : ${b}`)
 console.log(`c : ${notes.c}`)
 console.log(`b : ${notes.b}`)