export class ApiConfig {
  // Development API URL (Spring Boot running locally)
  private static readonly DEV_API_URL = 'http://localhost:8080/api/v1';
  
  // Production API URL (Update this when you deploy)
  private static readonly PROD_API_URL = 'https://your-production-domain.com/api/v1';

  /**
   * Get the appropriate API URL based on environment
   * Automatically detects if running on localhost (dev) or production
   */
  public static get apiUrl(): string {
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '';
    
    return isLocalhost ? this.DEV_API_URL : this.PROD_API_URL;
  }

  /**
   * Get full endpoint URL
   * @param endpoint - The endpoint path (e.g., 'users', 'courses')
   * Note: Do NOT include leading slash or '/api/v1/' - this is handled automatically
   */
  public static getEndpoint(endpoint: string): string {
    // Remove leading slash if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return `${this.apiUrl}/${cleanEndpoint}`;
  }

  // Specific API endpoints based on your backend structure
  public static readonly ENDPOINTS = {
    // Auth endpoints
    AUTH: {
      BASE: `${ApiConfig.apiUrl}/auth`,
      LOGIN: `${ApiConfig.apiUrl}/auth/login`,
      REGISTER: `${ApiConfig.apiUrl}/auth/register`,
      REFRESH: `${ApiConfig.apiUrl}/auth/refresh`,
      LOGOUT: `${ApiConfig.apiUrl}/auth/logout`
    },
    
    // User endpoints
    USERS: {
      BASE: `${ApiConfig.apiUrl}/users`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/users/${id}`,
      BY_ROLE: (role: string) => `${ApiConfig.apiUrl}/users/role/${role}`,
      PROFILE: `${ApiConfig.apiUrl}/users/profile`
    },
    
    // Course endpoints
    COURSES: {
      BASE: `${ApiConfig.apiUrl}/courses`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/courses/${id}`,
      BY_INSTRUCTOR: (instructorId: string) => `${ApiConfig.apiUrl}/courses/instructor/${instructorId}`,
      SEARCH: `${ApiConfig.apiUrl}/courses/search`,
      STATISTICS: (courseId: string) => `${ApiConfig.apiUrl}/courses/${courseId}/statistics`
    },
    
    // Lesson endpoints
    LESSONS: {
      BASE: `${ApiConfig.apiUrl}/lessons`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/lessons/${id}`,
      BY_COURSE: (courseId: string) => `${ApiConfig.apiUrl}/lessons/course/${courseId}`,
      UPLOAD: (lessonId: string) => `${ApiConfig.apiUrl}/lessons/${lessonId}/upload`
    },
    
    // Enrollment endpoints
    ENROLLMENTS: {
      BASE: `${ApiConfig.apiUrl}/enrollments`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/enrollments/${id}`,
      BY_USER: (userId: string) => `${ApiConfig.apiUrl}/enrollments/user/${userId}`,
      BY_COURSE: (courseId: string) => `${ApiConfig.apiUrl}/enrollments/course/${courseId}`,
      CHECK: (userId: string, courseId: string) => `${ApiConfig.apiUrl}/enrollments/check/${userId}/${courseId}`,
      MY_COURSES: `${ApiConfig.apiUrl}/enrollments/my-courses`,
      PROGRESS: (id: string) => `${ApiConfig.apiUrl}/enrollments/${id}/progress`
    },
    
    // Assignment endpoints
    ASSIGNMENTS: {
      BASE: `${ApiConfig.apiUrl}/assignments`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/assignments/${id}`,
      BY_COURSE: (courseId: string) => `${ApiConfig.apiUrl}/assignments/course/${courseId}`,
      UPCOMING: (userId: string) => `${ApiConfig.apiUrl}/assignments/upcoming/${userId}`,
      OVERDUE: (userId: string) => `${ApiConfig.apiUrl}/assignments/overdue/${userId}`
    },
    
    // Submission endpoints
    SUBMISSIONS: {
      BASE: `${ApiConfig.apiUrl}/submissions`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/submissions/${id}`,
      BY_ASSIGNMENT: (assignmentId: string) => `${ApiConfig.apiUrl}/submissions/assignment/${assignmentId}`,
      BY_STUDENT: (studentId: string) => `${ApiConfig.apiUrl}/submissions/student/${studentId}`,
      STUDENT_ASSIGNMENT: (studentId: string, assignmentId: string) => 
        `${ApiConfig.apiUrl}/submissions/student/${studentId}/assignment/${assignmentId}`,
      UPLOAD: `${ApiConfig.apiUrl}/submissions/upload`,
      GRADE: (id: string) => `${ApiConfig.apiUrl}/submissions/${id}/grade`,
      UNGRADED: (instructorId: string) => `${ApiConfig.apiUrl}/submissions/ungraded/instructor/${instructorId}`
    },
    
    // Quiz endpoints
    QUIZZES: {
      BASE: `${ApiConfig.apiUrl}/quizzes`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/quizzes/${id}`,
      BY_COURSE: (courseId: string) => `${ApiConfig.apiUrl}/quizzes/course/${courseId}`,
      SUBMIT: (quizId: string) => `${ApiConfig.apiUrl}/quizzes/${quizId}/submit`
    },
    
    // Question endpoints
    QUESTIONS: {
      BASE: `${ApiConfig.apiUrl}/questions`,
      BY_ID: (id: string) => `${ApiConfig.apiUrl}/questions/${id}`,
      BY_QUIZ: (quizId: string) => `${ApiConfig.apiUrl}/questions/quiz/${quizId}`,
      BULK: `${ApiConfig.apiUrl}/questions/bulk`
    }
  };

  /**
   * Check if app is running in production
   */
  public static get isProduction(): boolean {
    return window.location.hostname !== 'localhost' && 
           window.location.hostname !== '127.0.0.1';
  }

  /**
   * Check if app is running in development
   */
  public static get isDevelopment(): boolean {
    return !this.isProduction;
  }

  /**
   * API Configuration Settings
   */
  public static readonly CONFIG = {
    REQUEST_TIMEOUT: 30000, // 30 seconds
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ITEMS_PER_PAGE: 10,
    API_VERSION: 'v1'
  };
}