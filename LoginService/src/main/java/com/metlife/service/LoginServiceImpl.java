package com.metlife.service;

import com.metlife.dto.UserDTO;
import com.metlife.entity.User;
import com.metlife.exception.UserAlreadyExistsException;
import com.metlife.exception.UserNotFoundException;
import com.metlife.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.awt.desktop.UserSessionListener;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public class LoginServiceImpl implements LoginService {
    @Autowired
    UserRepository userRepository;

    public UserDTO login(User user) {
        Optional<User> user2 = userRepository.findByUserName(user.getUserName());
        if (user2.isPresent()) {
            User user1=user2.get();
            if (user1.getLastBlockedTime().plusMinutes(1).isBefore(LocalDateTime.now())) {
                if (!user1.isLoggedIn()) {
                    if (user1.getWrongPasswordAttempts() == 3) user1.setWrongPasswordAttempts(0);
                    if (user1.getPassword().equals(user.getPassword())) {
                        user1.setLoggedIn(true);
                        user1.setSessionId(UUID.randomUUID().toString());
                        user1.setWrongPasswordAttempts(0);
                        userRepository.save(user1);
                        return new UserDTO(user1);
                    } else {
                        user1.setWrongPasswordAttempts(user1.getWrongPasswordAttempts() + 1);
                        if (user1.getWrongPasswordAttempts() == 3) {
                            user1.setLastBlockedTime(LocalDateTime.now());
                        }
                        UserDTO userDTO=new UserDTO(userRepository.save(user1));
                        userDTO.setName("None");
                        userDTO.setErrorMessage("Wrong Password");
                        return userDTO;
                    }
                } else {
                    UserDTO userDTO=new UserDTO(user1);
                    userDTO.setName("None");
                    userDTO.setErrorMessage("MLNA");
                    return userDTO;
                }
            }
            UserDTO userDTO=new UserDTO(user1);
            userDTO.setName("None");
            userDTO.setErrorMessage("MAE");
            return userDTO;
        } else {
            UserDTO userDTO=new UserDTO(user);
            userDTO.setName("None");
            userDTO.setErrorMessage("Does Not Exist");
            return userDTO;
        }
    }


    public void logout(String userName) {
        Optional<User> user1 = userRepository.findByUserName(userName);
        if(user1.isPresent()){
            User user=user1.get();
            user.setLoggedIn(false);
            userRepository.save(user);
        }
    }


    public UserDTO addUser(User user) throws UserAlreadyExistsException {
        Optional<User> user1=userRepository.findByUserName(user.getUserName());
        if(user1.isPresent()){
            throw new UserAlreadyExistsException("User with username '"+user.getUserName()+"' already exists");
        }else {
            user.setLastBlockedTime(LocalDateTime.now().minusMinutes(31));
            return new UserDTO(userRepository.save(user));
        }
    }


    public boolean isLoggedIn(String userName,String sessionId) throws UserNotFoundException {
        User user = userRepository.findByUserName(userName).orElseThrow(()->new UserNotFoundException("User with username "+userName+" does not exist"));
        return user.getSessionId().equals(sessionId)&&user.isLoggedIn();
    }
}
