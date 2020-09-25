import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repositories, Error } from "./styles";

import logoImg from "../../assets/logo.svg";

import api from "../../services/api";
import Repository from "../Repository";

interface Repository {
  id: number;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState("");
  const [searchRepo, setSearchRepo] = useState("");
  const [respositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchRepo) {
      setInputError("Digite o autor/nome do repositório");
      return;
    }
    try {
      const { data: repository } = await api.get<Repository>(`repos/${searchRepo}`);

      const filteredRepos = respositories.filter((r) => r.id !== repository.id);

      setRepositories([...filteredRepos, repository]);
      setSearchRepo("");
      setInputError("");
    } catch (err) {
      setInputError("Erro na busca por esse repositório");
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Dashboard</Title>
      <Form hasError={!!inputError} onSubmit={(e) => handleAddRepository(e)}>
        <input
          value={searchRepo}
          onChange={(e) => setSearchRepo(e.target.value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {respositories.map((repository) => (
          <a key={repository.id}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
