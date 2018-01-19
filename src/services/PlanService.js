import request from 'src/services/Request';
import Plan from 'src/models/Plan';

export function getPlans() {
  return (request({
    url: `/plans/`,
  }): any).then(({ data }: { data: Array<any> }) =>
    data.map(plan => new Plan(plan))
  );
}
