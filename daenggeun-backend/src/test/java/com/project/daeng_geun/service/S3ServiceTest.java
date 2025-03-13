import com.project.daeng_geun.controller.S3Controller;
import com.project.daeng_geun.service.S3Service;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class) // ✅ JUnit 5용 Mockito 확장 사용
@WebMvcTest(S3Controller.class)
class S3ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private S3Service s3Service;

    @InjectMocks
    private S3Controller s3Controller;

    @Test
    void testGetPresignedUrl() throws Exception {
        String fileName = "test-image.jpg";
        String presignedUrl = "https://s3-bucket-url.com/" + fileName + "?presigned";

        when(s3Service.createPresignedUrl(fileName)).thenReturn(presignedUrl);

        mockMvc.perform(get("/api/user/presigned-url").param("fileName", fileName))
                .andExpect(status().isOk())
                .andExpect(content().string(presignedUrl));
    }
}
