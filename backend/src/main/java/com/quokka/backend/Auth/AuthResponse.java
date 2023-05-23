package com.quokka.backend.Auth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthResponse {

    Long id;
    String email;
}
