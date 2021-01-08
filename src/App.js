import { useEffect, useState } from 'react';
import './App.css';

export const parseResponse = (families, members) => {
  const response = families.map(family => {
    const { id, name, memebersIds } = family;
    const filteredMembers = members.filter(member => memebersIds.includes(member.id));
    const parsedFamily = {
      id,
      name,
      members: filteredMembers
    }

    return parsedFamily;
  }, []);

  return response;
}

function App() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const fectAll = async () => {
      const familiesRequest = await fetch('https://my-json-server.typicode.com/ajd01/demo/families');
      const familiesResponse = await familiesRequest.json();
      const membersRequest = await fetch('https://my-json-server.typicode.com/ajd01/demo/memebers');
      const membersResponse = await membersRequest.json();

      const parsedResponse = parseResponse(familiesResponse, membersResponse);
      setFamilies(parsedResponse);
    }

    fectAll();
  }, [])

  return (
    <div className="App">
      <h1>Table Exercise</h1>
      <div className="container">
        {families.map(({ id, name, members }) => (
          <div key={`family_${id}`} className="row">
            <div className="family-name col square">{name} Family</div>
            <div className="members col square" key={`family_${id}`}>
              {members.map(({ id, name, title }) => (
                <div key={`member_${id}`}>
                  <strong>{title}: </strong>{name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
