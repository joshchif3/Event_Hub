package jc.Myproject.service;

import jc.Myproject.model.User;
import jc.Myproject.model.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);
    User updateUser(User user);
    Optional<User> getUserById(int id);
    Optional<User> getUserByUsername(String username);
    List<User> getAllUsers();
    boolean deleteUser(int id);
    List<User> getUsersByRole(UserRole role);
}
