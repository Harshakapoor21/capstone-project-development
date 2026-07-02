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

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()

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