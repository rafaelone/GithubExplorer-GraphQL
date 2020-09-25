import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';

import { useQuery } from '@apollo/client';
import { GetIssuesOfRepository } from '../../graphql/queries';

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<IRepository | null>(null);
  const { params } = useRouteMatch<IRepositoryParams>();
  const { fetchMore } = useQuery(GetIssuesOfRepository);

  useEffect(() => {
    const [owner, name] = params.repository.split('/');
    fetchMore({ variables: { owner, name } }).then((response) => {
      setRepository(response.data.repository);
    });
  }, [fetchMore, params.repository]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.nameWithOwner}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazerCount}</strong>
              <span>start</span>
            </li>
            <li>
              <strong>{repository.forkCount}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.issues.totalCount}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {repository?.issues.nodes.map((issue) => (
          <a href={issue.url} key={issue.url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.author.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
