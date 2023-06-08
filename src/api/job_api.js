import { API_URL } from './api_url'
// const mode = {mode: "cors"}
//get all jobs, unprotected route, no token required
export const fetchAllJobs = async () => {
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

//get all jobs posted by one user   (protected)
export const fetchUserJobs = async (id) => {
    const url = API_URL + `/users/${id}/jobs`
    return fetch(url)
}

//CREATE new job
export const createNewJob = async (user_id, newJob) => {
    const token = JSON.parse(localStorage.getItem('petsJWT'))
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
export const updateJob = async (user_id, job_id, updatedJob) => {
    const token = JSON.parse(localStorage.getItem('petsJWT'))

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
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return {error: response.statusText, status: response.status}
    }

}
//DELETE
export const deleteJob = async(user_id, job_id) => {
    const token = JSON.parse(localStorage.getItem('petsJWT'))

    console.log('running fetch...')
    console.log(token)

    const url = API_URL + `/users/${user_id}/jobs/${job_id}`
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.token
        }
    }
    const response = await fetch(url, fetchOptions);
    console.log('response')
    console.log(response)
    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return {error: response.statusText, status: response.status}
    }
}
