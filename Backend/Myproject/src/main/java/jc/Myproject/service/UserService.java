package jc.Myproject.service;

import jc.Myproject.model.User;
import jc.Myproject.model.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);  // Method to create a user
    User updateUser(User user);  // Method to update user details
    Optional<User> getUserById(int id);  // Get user by ID
    Optional<User> getUserByUsername(String username);  // Get user by username
    Optional<User> getUserByEmail(String email);  // Get user by email (new method)
    List<User> getAllUsers();  // Get all users
    boolean deleteUser(int id);  // Delete user by ID
    List<User> getUsersByRole(UserRole role);  // Get users by role
}
