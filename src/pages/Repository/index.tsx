import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";

import imgLogo from "../../assets/logo.svg";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Header, RepositoryInfo, Issues } from "./styles";

import api from "../../services/api";

interface RepoParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepoParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    //parallel
    // api.get(`respos/${repository}`).then((response) => {
    //   console.log(response.data);
    // });
    // api.get(`respos/${repository}/issues`).then((response) => {
    //   console.log(response.data);
    // });

    //async await
    async function loadData() {
      //sequencial
      //const repository = await api.get(`repos/${params.repository}`);
      //const issues = await api.get(`repos/${params.repository}/issues`);

      //parallel
      const [repository, issues] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ]);
      setRepository(repository.data);
      setIssues(issues.data);
    }
    loadData();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={imgLogo} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login}></img>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url} target="_blank" rel="noopener noreferrer">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
