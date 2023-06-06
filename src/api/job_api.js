import { API_URL } from './api_url'

//get all jobs, unprotected route, no token required
export const fetchAllJobs = async (id) => {
    return fetch(API_URL + '/jobs')
}

//get one job by id (unprotected)
export const fetchJob = async (job_id) => {
    const url = API_URL + `/jobs/${job_id}`
      return fetch(url)
}

//get one job user_id and job_id(protected)
export const fetchUserJob = async(user_id, job_id) => {
    const job = await fetch(API_URL + `/users/${user_id}/jobs/${job_id}`)
    return job
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


//UPDATE
export const updateJob = async (user_id, job_id, updatedJob, token) => {
    const url = API_URL + `/users/${user_id}/jobs/${job_id}`
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        },
        body: JSON.stringify(updatedJob)
    }

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}
