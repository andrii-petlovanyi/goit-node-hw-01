import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db/contacts.json");

export async function getContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const strContactId = String(contactId);
    const contacts = await getContacts();

    const contact = contacts.filter((el) => el.id === strContactId);

    if (!contact) return `Sorry, but contact with id: ${contactId} not found`;

    return contact;
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const strContactId = String(contactId);
    const contacts = await getContacts();
    const indexRemovedCont = contacts.findIndex((el) => el.id === strContactId);

    if (indexRemovedCont === -1)
      return `Sorry, but contact with id:${contactId} not found`;

    const [removedContact] = contacts.splice(indexRemovedCont, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return removedContact;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    if (!name) return `Name is required`;
    if (!email) return `Email is required`;
    if (!phone) return `Phone is required`;

    const contacts = await getContacts();
    const newContact = { id: `${Date.now()}`, name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    return newContact;
  } catch (error) {
    console.log(error);
  }
}
