interface IRepository {
  name: string;
  nameWithOwner: string;
  description?: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

interface IFormProps {
  hasError: boolean;
}

interface IissueOwner {
  login: string;
}

interface Iissue {
  author: IissueOwner;
  title: string;
  url: string;
}

interface Iissues {
  totalCount: number;
  nodes: Iissue[];
}

interface IOwner {
  login: string;
  avatarUrl: string;
}

interface IRepository {
  description: string;
  forkCount: number;
  name: string;
  nameWithOwner: string;
  stargazerCount: string;
  owner: IOwner;
  issues: Iissues;
}

interface IRepositoryParams {
  repository: string;
}
