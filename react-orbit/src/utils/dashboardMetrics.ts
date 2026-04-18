
import {Application} from "@/lib/application";
import { APPLICATION_STATUSES } from "@/constants/applicationStatus";

function calculateMetrics(applications: Application[] = []){
  const totalApplications = applications.length;

  const interviewRate = totalApplications > 0 ? `${Math.round((applications.filter(app => app.Status === APPLICATION_STATUSES.INTERVIEW).length / totalApplications) * 100)}%` : "0%";
  const offerRate = totalApplications > 0 ? `${Math.round((applications.filter(app => app.Status === APPLICATION_STATUSES.OFFER).length / totalApplications) * 100)}%` : "0%";
  const rejectionRate = totalApplications > 0 ? `${Math.round((applications.filter(app => app.Status === APPLICATION_STATUSES.REJECTED).length / totalApplications) * 100)}%` : "0%";

  return {
    totalApplications,
    interviewRate,
    offerRate,
    rejectionRate
  };

}

export default calculateMetrics;