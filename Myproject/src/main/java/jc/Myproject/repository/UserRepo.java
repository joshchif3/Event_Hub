package jc.Myproject.repository;

import jc.Myproject.model.User;
import jc.Myproject.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username); // Find user by username
    List<User> findByRole(UserRole role); // Find users by role
}
