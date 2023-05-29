package com.quokka.backend.Auth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * Class to represent the response of the login function
 */
@Data
@Getter
@Setter
public class AuthResponse {

    Long id;
    String email;
}
