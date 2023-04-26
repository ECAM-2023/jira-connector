import http from "../http-common";
import IJiraUserData from "../types/jira_user.type";

class JiraUserDataService {
  getAll() {
    return http.get<Array<IJiraUserData>>("/jira/user");
  }

  get(id: string) {
    return http.get<IJiraUserData>(`/jira/${id}`);
  }

  create(data: IJiraUserData) {
    return http.post<IJiraUserData>("/jira", data);
  }

  update(data: IJiraUserData, id: any) {
    return http.put<any>(`/jira/${id}`, data);
  }

  findByAccountId(accountId: string) {
    return http.get<Array<IJiraUserData>>(`/jira?accountId=${accountId}`);
  }
}

export default new JiraUserDataService();
