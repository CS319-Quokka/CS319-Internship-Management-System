package com.quokka.backend.request;

import lombok.Data;

/**
 * Request to change the password
 */
@Data
public class ChangePasswordRequest {


        private String oldPassword;
        private String newPassword;
        private String newPassword2;
}
