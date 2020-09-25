import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repositories } from "./styles";

import logoImg from "../../assets/logo.svg";

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Dashboard</Title>
      <Form action="">
        <input type="text" placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="test">
          <img
            src="https://avatars3.githubusercontent.com/u/7282042?s=460&u=c358d49a0f13148754ffa4c0438d57165b2e38d5&v=4"
            alt="Thyago"
          />
          <div>
            <strong>My Repository</strong>
            <p>description kjljkll</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars3.githubusercontent.com/u/7282042?s=460&u=c358d49a0f13148754ffa4c0438d57165b2e38d5&v=4"
            alt="Thyago"
          />
          <div>
            <strong>My Repository</strong>
            <p>description kjljkll</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars3.githubusercontent.com/u/7282042?s=460&u=c358d49a0f13148754ffa4c0438d57165b2e38d5&v=4"
            alt="Thyago"
          />
          <div>
            <strong>My Repository</strong>
            <p>description kjljkll</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
