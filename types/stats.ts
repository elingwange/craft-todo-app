import { Status } from './issue';

export interface IssuesOverviewResponse {
  overview: {
    total: number;
    completed: number;
    completionRate: string;
  };
  distribution: Array<{ status: Status; count: number }>;
}
