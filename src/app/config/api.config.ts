export class ApiConfig {
  // Development API URL (Spring Boot running locally)
  private static readonly DEV_API_URL = 'http://localhost:8080/api/v1';
  
  // Production API URL (Update this when you deploy)
  private static readonly PROD_API_URL = 'https://your-production-domain.com/api/v1';

  /**
   * Check if code is running in browser (not server)
   */
  private static get isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Get the appropriate API URL based on environment
   * Handles both browser and server-side rendering
   */
  public static get apiUrl(): string {
    // If running on server (SSR), always use dev URL
    if (!this.isBrowser) {
      return this.DEV_API_URL;
    }

    // Browser environment - check hostname
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '';
    
    return isLocalhost ? this.DEV_API_URL : this.PROD_API_URL;
  }

  /**
   * Get full endpoint URL
   * @param endpoint - The endpoint path (e.g., 'users', 'courses')
   */
  public static getEndpoint(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return `${this.apiUrl}/${cleanEndpoint}`;
  }

  // Specific API endpoints based on your backend structure
  public static get ENDPOINTS() {
    const baseUrl = this.apiUrl;
    
    return {
      // Auth endpoints
      AUTH: {
        BASE: `${baseUrl}/auth`,
        LOGIN: `${baseUrl}/auth/login`,
        REGISTER: `${baseUrl}/auth/register`,
        REFRESH: `${baseUrl}/auth/refresh`,
        LOGOUT: `${baseUrl}/auth/logout`
      },
      
      // User endpoints
      USERS: {
        BASE: `${baseUrl}/users`,
        BY_ID: (id: string) => `${baseUrl}/users/${id}`,
        BY_ROLE: (role: string) => `${baseUrl}/users/role/${role}`,
        PROFILE: `${baseUrl}/users/profile`
      },
      
      // Course endpoints
      COURSES: {
        BASE: `${baseUrl}/courses`,
        BY_ID: (id: string) => `${baseUrl}/courses/${id}`,
        BY_INSTRUCTOR: (instructorId: string) => `${baseUrl}/courses/instructor/${instructorId}`,
        SEARCH: `${baseUrl}/courses/search`,
        STATISTICS: (courseId: string) => `${baseUrl}/courses/${courseId}/statistics`
      },
      
      // Lesson endpoints
      LESSONS: {
        BASE: `${baseUrl}/lessons`,
        BY_ID: (id: string) => `${baseUrl}/lessons/${id}`,
        BY_COURSE: (courseId: string) => `${baseUrl}/lessons/course/${courseId}`,
        UPLOAD: (lessonId: string) => `${baseUrl}/lessons/${lessonId}/upload`
      },
      
      // Enrollment endpoints
      ENROLLMENTS: {
        BASE: `${baseUrl}/enrollments`,
        BY_ID: (id: string) => `${baseUrl}/enrollments/${id}`,
        BY_USER: (userId: string) => `${baseUrl}/enrollments/user/${userId}`,
        BY_COURSE: (courseId: string) => `${baseUrl}/enrollments/course/${courseId}`,
        CHECK: (userId: string, courseId: string) => `${baseUrl}/enrollments/check/${userId}/${courseId}`,
        MY_COURSES: `${baseUrl}/enrollments/my-courses`,
        PROGRESS: (id: string) => `${baseUrl}/enrollments/${id}/progress`
      },
      
      // Assignment endpoints
      ASSIGNMENTS: {
        BASE: `${baseUrl}/assignments`,
        BY_ID: (id: string) => `${baseUrl}/assignments/${id}`,
        BY_COURSE: (courseId: string) => `${baseUrl}/assignments/course/${courseId}`,
        UPCOMING: (userId: string) => `${baseUrl}/assignments/upcoming/${userId}`,
        OVERDUE: (userId: string) => `${baseUrl}/assignments/overdue/${userId}`
      },
      
      // Submission endpoints
      SUBMISSIONS: {
        BASE: `${baseUrl}/submissions`,
        BY_ID: (id: string) => `${baseUrl}/submissions/${id}`,
        BY_ASSIGNMENT: (assignmentId: string) => `${baseUrl}/submissions/assignment/${assignmentId}`,
        BY_STUDENT: (studentId: string) => `${baseUrl}/submissions/student/${studentId}`,
        STUDENT_ASSIGNMENT: (studentId: string, assignmentId: string) => 
          `${baseUrl}/submissions/student/${studentId}/assignment/${assignmentId}`,
        UPLOAD: `${baseUrl}/submissions/upload`,
        GRADE: (id: string) => `${baseUrl}/submissions/${id}/grade`,
        UNGRADED: (instructorId: string) => `${baseUrl}/submissions/ungraded/instructor/${instructorId}`
      },
      
      // Quiz endpoints
      QUIZZES: {
        BASE: `${baseUrl}/quizzes`,
        BY_ID: (id: string) => `${baseUrl}/quizzes/${id}`,
        BY_COURSE: (courseId: string) => `${baseUrl}/quizzes/course/${courseId}`,
        SUBMIT: (quizId: string) => `${baseUrl}/quizzes/${quizId}/submit`
      },
      
      // Question endpoints
      QUESTIONS: {
        BASE: `${baseUrl}/questions`,
        BY_ID: (id: string) => `${baseUrl}/questions/${id}`,
        BY_QUIZ: (quizId: string) => `${baseUrl}/questions/quiz/${quizId}`,
        BULK: `${baseUrl}/questions/bulk`
      }
    };
  }

  /**
   * Check if app is running in production
   */
  public static get isProduction(): boolean {
    if (!this.isBrowser) return false;
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