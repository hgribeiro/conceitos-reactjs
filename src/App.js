import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
   api.get('/repositories').then(response => {
    setRepositories(response.data);
   });
}, []);

  async function handleAddRepository() {
    const response = await api.post ('/repositories', {
      title: `Novo Repositórico adicionado pelo botao ${Date.now()}`,
      url: "httpasdasdasda URL",
      techs: ["react","mongo","vue"],
    });

    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`, {

    });
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id );

    
    const newRepositories = [...repositories]
    newRepositories.splice(repositorieIndex, 1 );
    setRepositories([...newRepositories]);


  }

  return (
    <div>
      <ul data-testid="repository-list">
       
        {repositories.map(repositorie => <li key={repositorie.id}>{repositorie.title}
        <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button></li>)}
       
        {/* <li>
          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li> */}
      </ul>

      <button type= 'button' onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
