import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { AxiosError } from "axios";

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ddd: string;
}

const App: React.FC = () => {
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<Address | null>(null);

  const handleSearch = async (): Promise<void> => {
    try {
      const response = await axios.get<Address>(
        `https://viacep.com.br/ws/${cep}/json/`
      );
      setAddress(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(AxiosError);
    }
  };

  return (
    <div className="App-header">
      <h1>Busca de Endereço pelo CEP</h1>
      <input
        type="text"
        value={cep}
        onChange={(event) => setCep(event.target.value)}
        placeholder="Digite o CEP"
      />
      <button onClick={handleSearch}>Buscar</button>
      {address && (
        <div>
          <h2>Endereço encontrado:</h2>
          <p>CEP: {address.cep}</p>
          <p>Logradouro: {address.logradouro}</p>
          <p>Bairro: {address.bairro}</p>
          <p>Cidade: {address.localidade}</p>
          <p>Estado: {address.uf}</p>
          <p>DDD: {address.ddd}</p>
        </div>
      )}
    </div>
  );
};

export default App;
