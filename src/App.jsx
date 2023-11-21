import "./App.css";
import allContacts from "../src/contacts.json";
import { useState } from "react";

const contacts = allContacts.splice(0, 5);
function App() {
  const [contactsToShow, setContactsToShow] = useState(contacts);

  const handleContacts = () => {
    const randomNumber = Math.floor(Math.random() * allContacts.length);
    const arrayContacts = allContacts.splice(randomNumber, 1);
    setContactsToShow([...contactsToShow, arrayContacts[0]]);
  };

  const handleSortPopularity = () => {
    const sortedContactsPopularity = [...contactsToShow].sort(
      (contact1, contact2) =>
        contact1.popularity < contact2.popularity ? 1 : -1
    );
    setContactsToShow(sortedContactsPopularity);
  };

  const handleSortName = () => {
    const sortedContactsName = [...contactsToShow].sort((contact1, contact2) =>
      contact1.name < contact2.name ? -1 : 1
    );
    setContactsToShow(sortedContactsName);
  };

  const handleDelete = (index) => {
    const allContacts = [...contactsToShow];
    allContacts.splice(index, 1);
    setContactsToShow(allContacts);
  };
  return (
    <div className="App">
      <h3>IronContacts</h3>
      <button
        onClick={handleContacts}
        disabled={contactsToShow.length === 52 ? true : false}
      >
        Add Random Contact
      </button>
      <button onClick={handleSortPopularity}>Sort by popularity</button>
      <button onClick={handleSortName}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsToShow.map((contact, index) => {
            const { name, pictureUrl, popularity, wonOscar, wonEmmy } = contact;
            const popularityRound = popularity.toFixed(2);
            return (
              <tr key={index}>
                <td>
                  <img src={pictureUrl} alt="imageContact" width="50" />
                </td>
                <td>{name}</td>
                <td>{popularityRound}</td>
                <td>{wonOscar && "🏆"}</td>
                <td>{wonEmmy && "🌟"}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
