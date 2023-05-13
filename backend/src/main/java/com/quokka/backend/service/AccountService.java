package com.quokka.backend.service;

import com.quokka.backend.models.UserAccount;
import com.quokka.backend.repository.AccountRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    /*
    public List<UserProfile> getProfiles(Long id){
        return accountRepository.findById(id).get().getProfiles();
    }

    public boolean addUserProfile(UserProfile userProfile, Long accountId) throws UserProfileAlreadyExistsException {
        if(accountRepository.findById(accountId).get().getProfiles().contains(userProfile)){

            throw new UserProfileAlreadyExistsException("User Profile with id " + userProfile.getId() +
                    " already exists!");
        }

        accountRepository.findById(accountId).get().getProfiles().add(userProfile);
        return true;
    }

    public boolean removeProfile(UserProfile userProfile, Long accountId) throws UserProfileDoesNotExistException{
        if (!accountRepository.findById(accountId).get().getProfiles().contains(userProfile)){

            throw new UserProfileDoesNotExistException("User Profile with id" + userProfile.getId() +
                    " does not exists!");
        }

        accountRepository.findById(accountId).get().getProfiles().remove(userProfile);
        return true;
    }

    public boolean changeProfile(UserProfile userProfile, User user, Long accountId)throws UserProfileDoesNotExistException{
        if (!accountRepository.findById(accountId).get().getProfiles().contains(userProfile)){
            throw new UserProfileDoesNotExistException("User Profile with id" + userProfile.getId() +
                    " does not exists!");
        }

        accountRepository.findById(accountId).get().getUsers().
                get(accountRepository.findById(accountId).get().getUsers().indexOf(user)).setProfile(userProfile);
        return true;
    }

     */

    public UserAccount getAccountById(Long id){
        Optional<UserAccount> account = accountRepository.findById(id);
        if(!account.isPresent()){
            throw new IllegalStateException("No account found with id:" + id + "!");
        }

        return account.get();
    }

    public UserAccount addUserAccount( UserAccount userAccount) {


        return accountRepository.save(userAccount);
    }

    public List<UserAccount> getAllAccounts(){
        return accountRepository.findAll();
    }

    public UserAccount editAccount( Long id, UserAccount userAccount)  {
        Optional<UserAccount> account = accountRepository.findById(id);
        if (!account.isPresent()){
            throw new IllegalStateException("No account found with id:" + id + "!");
        }
        UserAccount foundUser = account.get();
        foundUser.setDepartment(userAccount.getDepartment());
        foundUser.setEmail(userAccount.getEmail());
        foundUser.setName(userAccount.getName());
        //foundUser.setProfiles(userAccount.getProfiles());
        //foundUser.setUsers(userAccount.getUsers());
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
}
