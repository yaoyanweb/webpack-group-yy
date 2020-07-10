import Axios from 'axios';
var instance = Axios.create({
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

 
export function createNewPlan(data) {
    return instance({
        method: 'post',
        url: `${DEV.api_url}/addPlanInfo.json`,
        contentType: 'application/json',
        data: data
    });
}