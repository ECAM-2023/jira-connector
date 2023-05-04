export default interface IJiraIssueData {
  id?: any | null,
  issue_id: string,
  key: string,
  nameIssueType: string,
  timespent: string,
  updated: string,
  description: string,
  status: string,
  summary: string,
  userId: string,
  organizationId: string
}