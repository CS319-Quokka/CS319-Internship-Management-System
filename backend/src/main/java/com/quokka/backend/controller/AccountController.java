package com.quokka.backend.controller;

import com.quokka.backend.models.UserAccount;
import com.quokka.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/api/login")
    public ResponseEntity<UserAccount> login(@RequestBody UserAccount userAccount) {
        try {
            boolean isLoginSuccessful = accountService.checkCredentials(userAccount.getEmail(), userAccount.getPassword());
            if (isLoginSuccessful) {
                UserAccount loggedUser = accountService.getUserByEmail(userAccount.getEmail());
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(loggedUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/account/add")
    public boolean addAccount(@RequestBody UserAccount userAccount){

        accountService.getAccountRepository().save(userAccount);
        return true;
    }

    @GetMapping("account/get_all")
    public List<UserAccount> getAllAccounts(){

        return accountService.getAccountRepository().findAll();
    }

    @GetMapping("/account/role/{id}")
    public String getRole(@PathVariable("id") Long ID){
        return accountService.getRole(ID);
    }

}
