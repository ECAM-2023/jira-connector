export default interface IJiraWorklogData {
  id?: any | null,
  worklog_id: string,
  issue_id: string,
  creatorId: string,
  timespent: string,
  updated: string,
  description: string,
}