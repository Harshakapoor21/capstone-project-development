package com.lms.config;

import com.lms.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        // Public APIs
                        .requestMatchers(
                                "/api/auth/**",
                                "/h2-console/**"
                        ).permitAll()

                        // Modules
                        .requestMatchers(HttpMethod.GET, "/api/modules/**")
                        .hasAnyRole("STUDENT", "INSTRUCTOR")

                        .requestMatchers(HttpMethod.POST, "/api/modules/**")
                        .hasRole("INSTRUCTOR")

                        .requestMatchers(HttpMethod.DELETE, "/api/modules/**")
                        .hasRole("INSTRUCTOR")

                        // Assignments
                        .requestMatchers(HttpMethod.GET, "/api/assignments/**")
                        .hasAnyRole("STUDENT", "INSTRUCTOR")

                        .requestMatchers(HttpMethod.POST, "/api/assignments/**")
                        .hasRole("INSTRUCTOR")

                        .requestMatchers(HttpMethod.DELETE, "/api/assignments/**")
                        .hasRole("INSTRUCTOR")

                        // Progress
                        .requestMatchers("/api/progress/**")
                        .authenticated()

                        // Everything else
                        .anyRequest()
                        .authenticated()
                )

                .addFilterBefore(jwtFilter,
                        UsernamePasswordAuthenticationFilter.class)

                .headers(headers ->
                        headers.frameOptions(frame -> frame.disable())
                );

        return http.build();
    }
}