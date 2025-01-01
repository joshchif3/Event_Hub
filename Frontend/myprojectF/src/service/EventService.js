const getEvents = async () => {
    const response = await fetch('/api/events');
    return await response.json();
  };
  
  export default {
    getEvents,
  };
  