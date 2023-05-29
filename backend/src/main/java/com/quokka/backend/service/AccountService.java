package com.quokka.backend.service;

import com.quokka.backend.models.Student;
import com.quokka.backend.models.User;
import com.quokka.backend.models.UserAccount;
import com.quokka.backend.repository.AccountRepository;
import com.quokka.backend.request.ChangePasswordRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

/**
 * Service for account related operations
 */
@Getter
@Setter
@Service
public class AccountService {

    //To access the methods of repository
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public UserAccount getAccountById(Long id){
        //trying to fetch the account. If it is not present, return null
        Optional<UserAccount> account = accountRepository.findById(id);
        if(!account.isPresent()){
            return null;
        }
        return account.get();
    }

    public UserAccount getAccountByEmail(String email){
        Optional<UserAccount> account = accountRepository.findByEmail(email);
        if(!account.isPresent()){
            return null;
        }

        return account.get();
    }

    public UserAccount addUserAccount(UserAccount userAccount) {
        Optional<UserAccount> account = accountRepository.findByEmail(userAccount.getEmail());
        if (account.isPresent()){
            return null;
        }

        return accountRepository.save(userAccount);
    }

    public UserAccount findByEmail(String mail){

        Optional<UserAccount> account =  accountRepository.findByEmail(mail);

        return accountRepository.findByEmail(mail).get();
    }

    /**
     * Checks if the credentials are valid
     * @param email
     * @param password
     * @return true if the credentials are valid, false otherwise
     */
    public boolean checkCredentials(String email, String password){

        boolean isValid = false;
        for(UserAccount x : accountRepository.findAll()){

            if(x.getEmail().equals(email) && x.getPassword().equals(password)){

                isValid = true;
            }
        }
        return isValid;
    }

    public List<UserAccount> getAllAccounts(Optional<String> department){
        //if department is given with optional parameter, return specific. If not, return all
        if (department.isEmpty()){
            return accountRepository.findAll();
        }
        return accountRepository.findByDepartment( department.get());
    }

    public UserAccount editAccount( Long id, UserAccount userAccount)  {
        //trying to fetch the account. If it is not present, throw exception
        Optional<UserAccount> account = accountRepository.findById(id);
        if (!account.isPresent()){
            //throw new IllegalStateException("No account found with id:" + id + "!");
            return null;
        }
        //if the account is present, update it
        UserAccount foundUser = account.get();
        foundUser.setDepartment(userAccount.getDepartment());
        foundUser.setEmail(userAccount.getEmail());
        foundUser.setFirstName(userAccount.getFirstName());
        foundUser.setLastName(userAccount.getLastName());
        foundUser.setPassword(userAccount.getPassword());
        foundUser.setProfilePic(userAccount.getProfilePic());

        return accountRepository.save(foundUser);

    }


    public void deleteAccount(Long id) {
        Optional<UserAccount> account = accountRepository.findById(id);
        if (!account.isPresent()){
            throw new IllegalStateException("No account found with id:" + id + "!");
        }
        accountRepository.deleteById(id);
    }

    public void deleteAllAccounts() {
        accountRepository.deleteAll();
        System.out.println("All accounts deleted!");
    }

    /**
     * Changes the password of the user using changePasswordRequest
     * @param id
     * @param request
     * @return different inputs to display different messages
     */
    public int changePassword(Long id, ChangePasswordRequest request){

        if(request.getNewPassword().equals("") || request.getNewPassword2().equals("")){

            return -5;
        }

        if(!(request.getNewPassword().equals(request.getNewPassword2()))){

            return -4;
        }

        if(request.getNewPassword().length() < 4){

            return -3;
        }

        Optional<UserAccount> accountOpt = accountRepository.findById(id);
        if(!accountOpt.isPresent()){

            return -2;
        }

        if(!(accountOpt.get().getPassword().equals(request.getOldPassword()))){

            return -1;
        }

        if(request.getOldPassword().equals(request.getNewPassword())){

            return 0;
        }

        UserAccount foundUser = accountOpt.get();
        foundUser.setPassword(request.getNewPassword());
        accountRepository.save(foundUser);
        return 1;
    }
}