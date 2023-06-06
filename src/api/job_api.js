import { API_URL } from './api_url'

//get all jobs, unprotected route, no token required
export const fetchAllJobs = async (id) => {
    return fetch(API_URL + '/jobs')
}

//get one job
export const fetchJob = async (id, job_id) => {
    const url = API_URL + `/jobs/${job_id}`
      return fetch(url)
}

//CREATE new job
export const createNewJob = async (user_id, newJob, token) => {
    const url = API_URL + `/users/${user_id}/jobs`
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token 
        },
        body: JSON.stringify(newJob)
    };

    const response = await fetch(url, fetchOptions);

    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return {error: response.statusText, status: response.status}
    }
}

//SHOW -> retrieve one job from db