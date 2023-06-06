import React from 'react'

export default function Application() {

    const [formData, setFormData] = useState({
        "content": "",
        "user_id": "",
        "job_id": "",
    })
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

  return (
    <div className='application-page'>
        <form className='application-form'>
            <h2>Tell the pet owner why you're applying for this job</h2>
            <textarea
                type='text'
                name='content'
                placeholder=""
                value={formData.description}
                onChange={handleFormChange}
            />

            <input
            type='submit'
            className='btn'
            value="Save Changes"
            />
        </form>
    </div>
  )
}
