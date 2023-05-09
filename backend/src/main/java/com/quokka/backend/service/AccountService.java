package com.quokka.backend.service;

import com.quokka.backend.exception.TeachingAssistantAlreadyExistsException;
import com.quokka.backend.exception.UserProfileAlreadyExistsException;
import com.quokka.backend.exception.UserProfileDoesNotExistException;
import com.quokka.backend.models.TeachingAssistant;
import com.quokka.backend.models.User;
import com.quokka.backend.models.UserProfile;
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
}
