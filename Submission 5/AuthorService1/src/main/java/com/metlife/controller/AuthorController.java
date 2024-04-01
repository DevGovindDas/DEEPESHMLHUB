package com.metlife.controller;

import com.metlife.entity.Author;
import com.metlife.exceptions.AuthorNotFoundException;
import com.metlife.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AuthorController {
    @Autowired
    AuthorRepository authorRepository;
    @GetMapping("/author/{authorId}")
    public ResponseEntity<Author> authorDetails(@PathVariable Integer authorId) throws AuthorNotFoundException {
        Optional<Author> author=authorRepository.findById(authorId);
        if(author.isPresent()){
            return new ResponseEntity<Author>(author.get(), HttpStatus.ACCEPTED);
        }else {
            throw new AuthorNotFoundException("Author with Id "+authorId+" does not exist");
        }
    }
    @GetMapping("/authors")
    public List<Author> allAuthorDetails() throws AuthorNotFoundException {
        List<Author> authors=authorRepository.findAll();
        return authors;
    }

    @PostMapping("/author")
    public Author addAuthor(@RequestBody Author author){
        Author author1=new Author();
        author1.setAuthorName(author.getAuthorName());
        author1.setEmailId(author.getEmailId());
        author1=authorRepository.save(author1);
        return author1;
    }

    @DeleteMapping("/author/{authorId}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable Integer authorId) throws AuthorNotFoundException {
        Optional<Author> author=authorRepository.findById(authorId);
        if(author.isPresent()) {
            authorRepository.deleteById(authorId);
            return new ResponseEntity<>(author.get(),HttpStatus.ACCEPTED);
        }else {
            throw new AuthorNotFoundException("Author with Id "+authorId+" does not exist");
        }
    }

    @PutMapping("/author")
    public ResponseEntity<Author> updateAuthor(@RequestBody Author author) throws AuthorNotFoundException {
        Optional<Author> author1=authorRepository.findById(author.getAuthorId());
        if(author1.isPresent()) {
            authorRepository.save(author);
            return new ResponseEntity<>(author,HttpStatus.ACCEPTED);
        }else {
            throw new AuthorNotFoundException("Author with Id "+author.getAuthorId()+" does not exist");
        }
    }
}
