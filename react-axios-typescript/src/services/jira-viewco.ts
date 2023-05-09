import http from "../http-common";
import IJiraOrganizationData from "../types/jira_organization.type"

class JiraOrganizationDataService {
  getAll() {
    return http.get<Array<IJiraOrganizationData>>("/jira/viewco");
  }

  get(id: string) {
    return http.get<IJiraOrganizationData>(`/jira/organization/${id}`);
  }

  create(data: IJiraOrganizationData) {
    return http.post<IJiraOrganizationData>("/jira/organization", data);
  }

  update(data: IJiraOrganizationData, id: any) {
    return http.put<any>(`/jira/organization/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/jira/organization/${id}`);
  }

  findByOrganizationID(organizationID: string) {
    return http.get<Array<IJiraOrganizationData>>(`/jira/organization?organizationID=${organizationID}`);
  }
}

export default new JiraOrganizationDataService();