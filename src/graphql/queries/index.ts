import { gql } from 'apollo-boost';

export const GetRepository = gql`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      nameWithOwner
      description
      owner {
        login
        avatarUrl
      }
    }
  }
`;

export const GetIssuesOfRepository = gql`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      nameWithOwner
      description
      stargazerCount
      forkCount
      owner {
        login
        avatarUrl
      }
      issues(
        states: OPEN
        last: 20
        orderBy: { direction: ASC, field: CREATED_AT }
      ) {
        totalCount
        nodes {
          id
          title
          createdAt
          author {
            login
          }
          url
        }
      }
    }
  }
`;
