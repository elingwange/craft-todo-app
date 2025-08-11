import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import IssueList from './IssueList';
import { Issue, ISSUE_PRIORITY, ISSUE_STATUS } from '@/db/schema';
import { Status, Priority } from '@/types/issue';
import React from 'react';

// Import the function we are mocking, so we can assert on it later.
import { formatRelativeTime } from '@/lib/utils';

// Mock the external `Link` component from Next.js to test its props without
// a full Next.js environment. We'll make it render a simple anchor tag.
jest.mock('next/link', () => {
  return ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock the `formatRelativeTime` utility to ensure consistent time rendering.
// This is the correct pattern to avoid hoisting issues: create the mock
// implementation directly inside the factory function.
jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  formatRelativeTime: jest.fn((date) => '2 days ago'),
}));

// Mock the `Badge` component to prevent testing its internal logic
// and to focus on the `IssueList` component itself.
// Here we add explicit type annotations to `children`, `status`, and `priority`
// to resolve the 'implicitly has any type' TypeScript error.
jest.mock('../basic/Badge', () => {
  return ({
    children,
    status,
    priority,
  }: {
    children: React.ReactNode;
    status?: Status;
    priority?: Priority;
  }) => (
    <span data-testid='badge' data-status={status} data-priority={priority}>
      {children}
    </span>
  );
});

// Mock a sample list of issues for our tests.
const mockIssues: Issue[] = [
  {
    id: 1,
    title: 'Bug: Fix login button alignment',
    status: 'todo',
    priority: 'high',
    createdAt: new Date('2024-07-01T12:00:00Z'),
    updatedAt: new Date('2024-07-01T12:00:00Z'),
    description: 'The login button is misaligned on the homepage.',
    userId: 'user123',
  },
  {
    id: 2,
    title: 'Feature: Add user profile page',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date('2024-07-02T12:00:00Z'),
    updatedAt: new Date('2024-07-02T12:00:00Z'),
    description: 'Implement the user profile page with editable fields.',
    userId: 'user456',
  },
];

// Describe the test suite for the IssueList component.
describe('IssueList', () => {
  // We will mock the global `fetch` function for each test to control the API response.
  // Using `Parameters<typeof fetch>` to get the exact type signature of the fetch function.
  let fetchSpy: jest.SpyInstance<Promise<Response>, Parameters<typeof fetch>>;

  // Add a mock implementation of `global.fetch` before all tests.
  // This is a necessary step because `jest-environment-jsdom` does not
  // provide a global `fetch` by default.
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    // Before each test, mock the global `fetch` to return a controlled response.
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockIssues),
        }) as Promise<Response>
    );
  });

  afterEach(() => {
    // After each test, restore the original `fetch` function.
    fetchSpy.mockRestore();
    // Clear all mocks to ensure tests are isolated.
    jest.clearAllMocks();
  });

  // Test case 1: It should render the loading state initially.
  it('should render the loading state initially', async () => {
    // We mock fetch but don't resolve it immediately to test the loading state.
    // In this specific mock, we are resolving, so we need to check the state before resolution.
    render(<IssueList />);

    // Assert that the 'Loading...' text is visible.
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Use waitFor to wait for the fetch promise to resolve and the UI to update.
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  // Test case 2: It should render a list of issues after fetching data.
  it('should render a list of issues after fetching data', async () => {
    render(<IssueList />);

    // Wait for the mock fetch call to resolve and the component to update.
    await waitFor(() => {
      // Assert that the titles from the mock data are present.
      expect(screen.getByText(mockIssues[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockIssues[1].title)).toBeInTheDocument();

      // Assert that the mocked `Badge` components are rendered with correct props.
      const badges = screen.getAllByTestId('badge');
      expect(badges[0]).toHaveAttribute('data-status', mockIssues[0].status);
      expect(badges[1]).toHaveAttribute('data-priority', mockIssues[0].priority);
      expect(badges[2]).toHaveAttribute('data-status', mockIssues[1].status);
      expect(badges[3]).toHaveAttribute('data-priority', mockIssues[1].priority);

      // Assert that the correct status and priority labels are displayed.
      expect(
        screen.getByText(ISSUE_STATUS[mockIssues[0].status as Status].label)
      ).toBeInTheDocument();
      expect(
        screen.getByText(ISSUE_PRIORITY[mockIssues[0].priority as Priority].label)
      ).toBeInTheDocument();

      // Assert that `formatRelativeTime` was called for each issue.
      expect(formatRelativeTime).toHaveBeenCalledTimes(mockIssues.length);
    });
  });

  // Test case 3: It should render the "No issues found" message when the list is empty.
  it('should render "No issues found" when the issue list is empty', async () => {
    // Override the mock fetch for this specific test case to return an empty array.
    fetchSpy.mockImplementationOnce(
      () =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        }) as Promise<Response>
    );

    render(<IssueList />);

    // Wait for the fetch call to resolve with an empty array.
    await waitFor(() => {
      // Assert that the 'No issues found' message is visible.
      expect(screen.getByText('No issues found.')).toBeInTheDocument();

      // Assert that none of the mock issue titles are present.
      expect(screen.queryByText(mockIssues[0].title)).not.toBeInTheDocument();
    });
  });

  // Test case 4: It should render Links with the correct href.
  it('should render Links with the correct hrefs', async () => {
    render(<IssueList />);

    await waitFor(() => {
      // Get all link elements on the screen.
      const links = screen.getAllByRole('link');
      // Assert that the href for each link is correct.
      expect(links[0]).toHaveAttribute('href', `/issues/${mockIssues[0].id}`);
      expect(links[1]).toHaveAttribute('href', `/issues/${mockIssues[1].id}`);
    });
  });

  it('should render a list of issues and correctly pass props to the Badge component', async () => {
    render(<IssueList />);

    await waitFor(() => {
      expect(screen.getByText(mockIssues[0].title)).toBeInTheDocument();

      const statusBadgeHigh = screen.getByText(ISSUE_STATUS[mockIssues[0].status as Status].label);
      const priorityBadgeMedium = screen.getByText(
        ISSUE_PRIORITY[mockIssues[1].priority as Priority].label
      );

      expect(statusBadgeHigh).toBeInTheDocument();
      expect(priorityBadgeMedium).toBeInTheDocument();
    });
  });
});
