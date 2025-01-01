package jc.Myproject.model;

public class UserLoginRequest {

    private String email;
    private String password;

    // Default constructor
    public UserLoginRequest() {}

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
