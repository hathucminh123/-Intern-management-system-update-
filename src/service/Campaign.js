export async function createNewCampaign(eventData) {
  const response = await fetch(`https://intern-management.onrender.com/api/Campaign`, {
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


export async function fetchCampaigns() {
  let url = 'https://intern-management.onrender.com/api/Campaign';
  
  // const params = new URLSearchParams();
  // if (searchTerm) {
  //   params.append('search', searchTerm);
  // }
  // if (max) {
  //   params.append('max', max);
  // }
  // if (params.toString()) {
  //   url += `?${params.toString()}`;
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

