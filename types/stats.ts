import { Status } from './issue';

export interface IssuesOverviewResponse {
  overview: {
    total: number;
    completed: number;
    completionRate: number;
  };
  distribution: Array<{ status: Status; count: number }>;
}
