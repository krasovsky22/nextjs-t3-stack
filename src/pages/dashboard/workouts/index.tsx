import { CalendarWeek } from "@components/calendarWeek";

const WorkoutPage = () => {
  return (
    <>
      <div className="flex h-full flex-col gap-3">
        <CalendarWeek />
      </div>
    </>
  );
};

WorkoutPage.requireAuth = true;
WorkoutPage.title = "WorkoutPage";
WorkoutPage.description = "Workouts Page Description";

export default WorkoutPage;
