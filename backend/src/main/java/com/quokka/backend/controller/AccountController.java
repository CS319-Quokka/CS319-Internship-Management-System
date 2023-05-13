package com.quokka.backend.controller;

import com.quokka.backend.exception.TeachingAssistantAlreadyExistsException;
import com.quokka.backend.models.User;
import com.quokka.backend.models.UserAccount;
import com.quokka.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/account")
//@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

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
