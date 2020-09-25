import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories, Error } from './styles';
import { useQuery } from '@apollo/client';
import { GetRepository } from '../../graphql/queries';

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  const { fetchMore } = useQuery(GetRepository);

  const [repositories, setRepositories] = useState<IRepository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories'
    );
    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  const handleAddRepository = useCallback(
    async (event) => {
      event.preventDefault();
      if (!newRepo) {
        setInputError('Digite autor/nome do repositório');
        return;
      }
      const [owner, name] = newRepo.split('/');

      try {
        const response = await fetchMore({
          variables: {
            owner,
            name,
          },
        });
        console.log(response);
        const { repository } = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo('');
        setInputError('');
      } catch (err) {
        setInputError('Erro na busca por esse repositório');
      }
    },
    [fetchMore, newRepo, repositories]
  );

  return (
    <>
      <Title>Explore repositórios no GitHub</Title>
      <Form onSubmit={handleAddRepository} hasError={!!inputError}>
        <input
          type="text"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório, exemplo: facebook/react"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            to={`/repositories/${repository.nameWithOwner}`}
            key={repository.nameWithOwner}
          >
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.nameWithOwner}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
