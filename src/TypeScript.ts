interface CourseTypeScript {
  id: number;
  name: string;
  description: string;
}

interface CourseTypesTypeScript {
  id: number;
  name: string;
  description: string;
}

interface StudentTypeScript {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  collage: string;
  feeAmount: number | string;
  paymentStatus: string;
  email: string;
  selectedCourse: string;
  notes: string;
  createdAt: string;
}

interface CombinedCoursesTypeScript {
    id: number, type: string, course: string
}

export type { CourseTypeScript, CourseTypesTypeScript, StudentTypeScript,CombinedCoursesTypeScript };
