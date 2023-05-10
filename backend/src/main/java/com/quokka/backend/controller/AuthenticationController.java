// package com.quokka.backend.controller;
//
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;
//
// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:3000")
// public class AuthenticationController {
//
//     private AuthenticationManager authenticationManager;
//     private final UserDetailsService userDetailsService;
//     private final PasswordEncoder passwordEncoder;
//
//     public AuthenticationController(
//                           UserDetailsService userDetailsService,
//                           PasswordEncoder passwordEncoder) {
//         this.authenticationManager = authenticationManager;
//         this.userDetailsService = userDetailsService;
//         this.passwordEncoder = passwordEncoder;
//     }
//
//     @PostMapping("/login")
//     public ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginForm) {
//         Authentication authentication = authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(loginForm.getEmail(), loginForm.getPassword()));
//
//         UserDetails userDetails = userDetailsService.loadUserByUsername(loginForm.getEmail());
//
//         String token = JwtUtils.generateToken(userDetails);
//
//         return ResponseEntity.ok(new JwtResponse(token));
//     }
//
//     @ExceptionHandler({UsernameNotFoundException.class})
//     public ResponseEntity<?> handleException(Exception e) {
//         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//     }
//
// }
