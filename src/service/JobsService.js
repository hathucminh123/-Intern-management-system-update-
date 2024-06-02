export async function createNewJobs(eventData) {
    const response = await fetch(`https://intern-management.onrender.com/api/TrainingProgram`, {
      method: 'POST',
      body: JSON.stringify(eventData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred while creating the event');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }
  
    const { event } = await response.json();
  
    return event;
  }



  // export async function fetchJobs({ searchTerm, max }) {
    
  export async function fetchJobs() {
    let url = 'https://intern-management.onrender.com/api/TrainingProgram';
    // if (searchTerm && max) {
    //     url += `?search=${searchTerm}&max=${max}`;
    // } else if (searchTerm) {
    //     url += `?search=${searchTerm}`;
    // } else if (max) {
    //     url += `?max=${max}`;
    // }

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the jobs');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const job = await response.json();
    return {
        events: job.result, 
        total: job.total,  
    };
}

  