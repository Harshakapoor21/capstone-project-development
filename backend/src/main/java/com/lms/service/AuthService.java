package com.lms.service;

import com.lms.dto.LoginRequest;
import com.lms.dto.RegisterRequest;
import com.lms.entity.User;
import com.lms.repository.UserRepository;
import com.lms.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest req) {

        User user = new User();

        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(req.getRole());

        repo.save(user);

        return "User Registered Successfully";
    }

    public String login(LoginRequest req) {

        System.out.println("===== LOGIN CALLED =====");
        System.out.println("Email = " + req.getEmail());

        User user = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("User found");

        if (encoder.matches(req.getPassword(), user.getPassword())) {

            System.out.println("Password matched");

            try {

                String token = jwtUtil.generateToken(
                    user.getEmail(),
                    user.getRole()
);

                System.out.println("Token generated");

                return token;

            } catch (Exception e) {

                e.printStackTrace();

                return "JWT ERROR";
            }
        }

        System.out.println("Password mismatch");

        return "Invalid Credentials";
    }
}