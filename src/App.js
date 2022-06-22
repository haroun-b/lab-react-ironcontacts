import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5));
  const contactsTbl = contacts.map(contact => {
    return (
      <tr key={contact.name}>
        <td>
          <img src={contact.pictureUrl} alt="" height="150" />
        </td>
        <td>{contact.name}</td>
        <td>{contact.popularity}</td>
        <td>{contact.wonOscar && `🏆`}</td>
        <td>{contact.wonEmmy && `🏆`}</td>
        <td>
          <button onClick={() => deleteContact(contact)}>Delete</button>
        </td>
      </tr>
    );
  });

  function addRandomContact() {
    const unusedContacts = allContacts.filter(
      contact => !contacts.includes(contact)
    );
    const randomIndex = Math.floor(Math.random() * unusedContacts.length);

    if (unusedContacts.length) {
      setContacts([...contacts, unusedContacts[randomIndex]]);
    }
  }

  function sortBy(x) {
    if (x === `popularity`) {
      setContacts([...contacts.sort((a, b) => b[x] - a[x])]);
    } else {
      setContacts([
        ...contacts.sort((a, b) =>
          a[x].localeCompare(b[x], "en", { sensitivity: "base" })
        )
      ]);
    }
  }

  function deleteContact(contact) {
    setContacts(contacts.filter(c => c !== contact));
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th colSpan="5">IronContact</th>
          </tr>
          <tr>
            <th colSpan="5">
              <button onClick={addRandomContact}>Add Random Contact</button>
              <button
                onClick={() => {
                  sortBy(`popularity`);
                }}
              >
                Sort By Popularity
              </button>
              <button
                onClick={() => {
                  sortBy(`name`);
                }}
              >
                Sort By Name
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>action</th>
          </tr>

          {contactsTbl}
        </tbody>
      </table>
    </div>
  );
}

export default App;
