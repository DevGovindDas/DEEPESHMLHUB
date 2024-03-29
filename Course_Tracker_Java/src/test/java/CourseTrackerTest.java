import com.metlife.model.Course;
import com.metlife.repository.CourseRepository;
import org.junit.jupiter.api.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CourseTrackerTest {
    CourseRepository repository;

    @BeforeAll
    static void testClassSetup() {
        System.out.println("Executed BEFORE ALL tests");
        // Add setup logic for the entire test class here.
        // This could include initializing shared resources,
        // setting up a database connection, etc.
    }
    @BeforeEach
    void testMethodSetUp() {
        System.out.println("Executed BEFORE EACH test");
        // Add setup logic for each test method here.
        repository=new CourseRepository();
    }
    @Test
    void allowAddCourse() {
        System.out.println("1 allowAddCourse()");
//              HRCalendar calendar = new HRCalendar();
        Course course=repository.addCourse(new Course("Name1","Category1",100,true));
        assertEquals(5,repository.getCourses().size());
        assertEquals(course.getName(),"Name1");
        assertEquals(course.getCategory(),"Category1");
        assertEquals(course.getPrice(),100);
        assertTrue(course.isAvailible());
    }
//    @Order(2)
    @Test
    void checkDeleteCourseById() {
        System.out.println("2 checkDeleteCourseById()");
        repository.deleteCourseById(1);
        Course course=repository.findCourseById(1);
        assertNull(course);
    }

//    @Order(3)
    @Test
    void updateCourseCheck() {
        System.out.println("3 updateCourseCheck()");
        Course course=repository.findCourseById(1);
        String name=course.getName();
        course.setName("Updated Name");
        repository.updateCourse(course);
        Course course2=repository.findCourseById(1);
        assertEquals(name,course2.getName());
        assertEquals(course.getCategory(),course2.getCategory());
        assertEquals(course.getPrice(),course2.getPrice());
        assertEquals(course.isAvailible(),course2.isAvailible());
    }
//    @Order(4)
   @Test
    void testCourseRead() {
        System.out.println("4 testCourseRead()");
       Course course =repository.addCourse(new Course("Name1","Category1",100,true));
       Course course1= repository.findCourseById(course.getId());

       assertEquals(course.getName(),course1.getName());
       assertEquals(course.getCategory(),course1.getCategory());
       assertEquals(course.getPrice(),course1.getPrice());
       assertEquals(course.isAvailible(),course1.isAvailible());
    }
    @AfterEach
    void testMethodTearDown() {
        System.out.println("Executed AFTER EACH test");
        // Add tear down logic for each test method here.

    }
    @AfterAll
    static void testClassTearDown() {
        System.out.println("Executed AFTER ALL tests");
        // Add tear down logic for the entire test class here.
        // This could include closing database connections, releasing resources, etc.
    }
}
