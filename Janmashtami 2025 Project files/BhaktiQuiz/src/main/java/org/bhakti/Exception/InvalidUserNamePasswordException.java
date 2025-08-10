package org.bhakti.Exception;

public class InvalidUserNamePasswordException extends Exception {
    public InvalidUserNamePasswordException(String invalidCredentials) {
        super(invalidCredentials);
    }
}
