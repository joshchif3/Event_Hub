const API_URL = "http://localhost:8080/api";  // Adjust the backend URL

// ========================== Users API ==========================

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Fetch user by ID
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
  }
};

// Fetch user by username
export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${API_URL}/users/username/${username}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with username ${username}:`, error);
  }
};

// Fetch user by email (Add this function)
export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/email/${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Update an existing user
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
  }
};

// Fetch users by their role
export const getUsersByRole = async (role) => {
  try {
    const response = await fetch(`${API_URL}/users/role/${role}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching users with role ${role}:`, error);
  }
};


// ========================== Events API ==========================

// Fetch all approved events
export const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();

    // Filter events with status 'approved'
    const approvedEvents = data.filter((event) => event.status === "APPROVED");

    return approvedEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Fetch an event by ID
export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
  }
};

// Create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
  }
};

// Update an existing event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error updating event with id ${id}:`, error);
  }
};

// Delete an event
export const deleteEvent = async (id) => {
  try {
    await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error deleting event with id ${id}:`, error);
  }
};
