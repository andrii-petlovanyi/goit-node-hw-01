import { Command } from "commander";
import {
  addContact,
  getContactById,
  getContacts,
  removeContact,
} from "./contacts.js";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await getContacts();
        console.table(contacts);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "get":
      try {
        const contactById = await getContactById(id);
        console.table(contactById);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        console.table(newContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "remove":
      try {
        const delContact = await removeContact(id);
        console.table(delContact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.log("Sorry, unknown action type...");
  }
}

invokeAction(argv);
