/*package com.quokka.backend.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.HashMap;
import java.util.Map;
@Configuration
@EnableWebSecurity
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationConfig {

    @GetMapping("user-type")
    public Map<String, String> getUserType(Authentication authentication) {
        Map<String, String> userType = new HashMap<>();
        userType.put("userType", authentication.getAuthorities().toString());
        return userType;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .requestMatchers("/").permitAll()
                .requestMatchers("/**").authenticated()
                .and()
                .formLogin().permitAll();
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails student = User.withUsername("idil")
                .password(encoder().encode("idil123"))
                .roles("STUDENT")
                .build();

        UserDetails admin = User.withUsername("begum")
                .password(encoder().encode("begum123"))
                .roles("ADMINISTRATIVE-ASSISTANT")
                .build();
        UserDetails instructor = User.withUsername("eray")
                .password(encoder().encode("eray123"))
                .roles("INSTRUCTOR")
                .build();
        UserDetails ta = User.withUsername("umair")
                .password(encoder().encode("umair123"))
                .roles("TA")
                .build();
        UserDetails coordinator = User.withUsername("saksoy")
                .password(encoder().encode("saksoy123"))
                .roles("COORDINATOR")
                .build();
        return new InMemoryUserDetailsManager(student,admin,instructor,ta,coordinator);
    }

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

}
*/

