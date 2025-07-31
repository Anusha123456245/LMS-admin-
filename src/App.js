// // src/App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminLayout from './pages/AdminLayout';
// import Dashboard from './pages/Dashboard';
// import CourseForm from './components/CourseForm';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AdminLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="create-course" element={<CourseForm />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/AdminLayout';
import Dashboard from './pages/Dashboard';
import CourseForm from './components/CourseForm';
import AssignmentForm from './components/AssignmentForm';
import CreateQuizWithQuestionsForm from './components/QuizForm';
import MaterialForm from './components/MaterialForm';
import InstructorForm from './components/InstructorForm';
import LessonContentForm from './components/LessonsForm';
import QuizQuestionForm from './components/QuizQuestionForm';
import LessonContent from './components/LessonContent';
import CategoryForm from './components/CategoryForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-course" element={<CourseForm />} />
          <Route path="assignments" element={<AssignmentForm />} />
          <Route path="quizform" element={<CreateQuizWithQuestionsForm />} />
          <Route path="materialform" element={<MaterialForm />} />
          <Route path="instructorform" element={<InstructorForm />} />
          <Route path="lessonform" element={<LessonContentForm />} />
          <Route path="lessoncontent" element={<LessonContent/>} />

          <Route path="quizquestionform" element={<QuizQuestionForm />} />

          <Route path="categoryform" element={<CategoryForm />} />






        </Route>
      </Routes>
    </Router>
  );
}

export default App;
