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

export default WorkoutPage;
