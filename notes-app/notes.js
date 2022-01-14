const fs = require("fs");
const chalk = require("chalk");

const { mainModule } = require("process");

const getNotes = function () {
  return "your notes..";
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find((n) => n.title == title);

  //node inspect app.js add --title='t' --body=='b'
  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  notesTokeep = notes.filter((note) => note.title != title);
  saveNotes(notesTokeep);

  if (notesTokeep.length < notes.length) {
    console.log(chalk.green.inverse("remove note success"));
  } else {
    console.log(chalk.red.inverse("no note found"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes"));

  console.log(notes[0].title);
  notes.forEach((n) => console.log(n.title));
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return []; // 빈 데이터
  }
};

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find((n) => n.title == title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.length(chalk.red.inverse("Note not found!"));
  }
};
// module.exports = name;
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes,
};
