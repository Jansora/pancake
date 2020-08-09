package com.jansora;

import com.jansora.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
class ApplicationTests {

	@Autowired
	private UserService userService;

	@Test
	void contextLoads() {
	}

	@Test
	void testDate()
	{
		LocalDate now = LocalDate.now();
		String a = now.toString();
		System.out.println(now.toString());
	}

}
