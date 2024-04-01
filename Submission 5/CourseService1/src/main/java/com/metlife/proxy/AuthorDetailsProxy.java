package com.metlife.proxy;

import com.metlife.entity.Author;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name ="Author-Service")
public interface AuthorDetailsProxy {
    @GetMapping("/author/{authorId}")
    public Author getAuthor(@PathVariable Integer authorId);
}
//@FeignClient
