"use client";

import withChakra from "@utils/withChakra";
import { api } from "@utils/api";
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

export default withChakra(api.withTRPC(WorkoutPage));
