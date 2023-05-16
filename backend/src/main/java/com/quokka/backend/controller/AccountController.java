package com.quokka.backend.controller;

import com.quokka.backend.Auth.AuthResponse;
import com.quokka.backend.models.User;
import com.quokka.backend.models.UserAccount;
import com.quokka.backend.service.AccountService;
import com.quokka.backend.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;
    private UserManagementService userManagementService;

    @PostMapping("/api/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserAccount userAccount) {

        AuthResponse response = new AuthResponse();
        try {

            boolean isLoginSuccessful = accountService.checkCredentials(userAccount.getEmail(), userAccount.getPassword());
            if (isLoginSuccessful) {

                UserAccount user = accountService.findByEmail(userAccount.getEmail()); // get the user object

                response.setId(user.getId());
                response.setEmail(user.getEmail());
                return ResponseEntity.ok(response);
            }
            else {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/get_all_users/{id}")
    public List<User> getProfilesByAccountId(@PathVariable Long id) {

        List<User> usersList = userManagementService.getProfilesByAccountId(id);
        if(usersList.size() == 0){

            return null;
        }
        return usersList;
    }

    @PostMapping
    public UserAccount addAccount(@RequestBody UserAccount userAccount){

        return accountService.addUserAccount(userAccount);

    }

    @GetMapping
    public List<UserAccount> getAllAccounts(){

        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public UserAccount getAccountById(@PathVariable Long id){

        return accountService.getAccountById(id);
    }

    @PutMapping("/{id}")
    public UserAccount editAccount(@PathVariable Long id, @RequestBody UserAccount newAccount){

        return accountService.editAccount(id, newAccount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return new ResponseEntity<>("Account deleted successfully", HttpStatus.OK);
    }

    @DeleteMapping
    public void deleteAllAccounts(){
        accountService.deleteAllAccounts();
    }
}
