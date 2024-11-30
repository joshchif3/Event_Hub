package jc.Myproject.service;

import jc.Myproject.model.User;
import jc.Myproject.model.UserRole;
import jc.Myproject.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    @Autowired
    public UserServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);  // Save the user to the database
    }

    @Override
    public User updateUser(User user) {
        if (userRepo.existsById(user.getId())) {
            return userRepo.save(user);  // Update the user if exists
        }
        throw new IllegalArgumentException("User not found");
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepo.findById(id);  // Get user by ID
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepo.findByUsername(username);  // Get user by username
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();  // Get all users
    }

    @Override
    public boolean deleteUser(int id) {
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);  // Delete user by ID
            return true;
        }
        return false;
    }

    @Override
    public List<User> getUsersByRole(UserRole role) {
        return userRepo.findByRole(role);  // Get users by role (e.g., NORMAL_USER, EVENT_ORGANIZER, ADMIN)
    }
}
